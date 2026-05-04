# LeadIntel — Análise Técnica Completa & Roadmap SaaS

> Revisão sênior de código · Arquitetura · Produto · Engenharia

---

## Score Geral: 7.4 / 10 ★★★★☆

**Acima da média para um teste técnico.** Código bem estruturado com padrões avançados — mas com gaps críticos antes de ir para produção.

| Dimensão | Nota |
|---|---|
| Domínio & Design Patterns | 9/10 |
| TypeScript & Tipagem | 6.5/10 |
| Tratamento de Erros | 7/10 |
| Testabilidade | 3/10 |
| Segurança | 4/10 |
| UX / Frontend | 8/10 |
| Escalabilidade | 5/10 |
| Organização de Código | 8.5/10 |

---

## Parte 1 — Análise Técnica

### O que se destaca positivamente

**Decorator Pattern no Domínio**
O uso de `BrasilAPICompany` wrappando `DefaultCompany` com decorators como `FormattedCNPJ`, `TranslatedCNAE` e `HumanReadableDate` é textbook Clean Architecture — raro em testes técnicos desse nível.

**Specification Pattern**
`ActiveCompanySpecification`, `StateSpecification` etc. com composição via `.and()/.or()/.not()` demonstra domínio sólido de DDD. Praticamente nenhum candidato chega nesse nível.

**Shared Types Monorepo**
A pasta `shared/types` separando DTOs, domain objects e validators é uma decisão arquitetural madura. Permite isomorfismo entre frontend e backend sem duplicação.

**State Machine no Frontend**
`SearchState` como union type (`"idle" | "loading" | "success" | "error_inactive"...`) é uma máquina de estados limpa. Evita o clássico anti-pattern de múltiplos booleans (`isLoading + isError + isSuccess`).

**Validação de Contato Rica**
`contactValidator.ts` com detecção de domínio suspeito, email corporativo vs genérico, verificação de coerência nome-email — nível produto real, não exercício acadêmico.

**UX Bem Pensada**
CNPJInput com estados visuais, animação de score, `ScoreIndicator` com `requestAnimationFrame`, SkeletonLoader, InsightBlock com delay de animação — atenção rara a detalhes de interação.

---

## Parte 2 — Problemas Encontrados

### 🔴 Bugs Confirmados

#### Bug #1 — `calculateScore()` nunca é chamado

Em `CompanyService.ts` existe um método `private calculateScore()` que refaz todo o cálculo de score — mas o método `enrich()` não o chama. O score é calculado inline diretamente no corpo de `enrich()`. O método está morto e duplicado.

```typescript
// enrich() — calcula score inline (correto, é esse que roda)
const weighted = new WeightedLeadScore({...});
const score = weighted.getValue(); // ← usado aqui

// calculateScore() — duplicado, nunca chamado, tem fallback diferente (55 vs 50)
private calculateScore(company, raw): number {
  const sizeScore = SIZE_SCORES[sizeKey] ?? 55; // ← fallback diferente do método ativo (50)!
  ...
}
```

**Fix:** Extrair a lógica de score para um `ScoreCalculator` standalone e chamar de um único lugar.

---

#### Bug #2 — Delay artificial de 800ms hardcoded

Em `BrasilAPIRepository.ts`:

```typescript
await new Promise((r) => setTimeout(r, 800)); // ← isso não deveria existir em produção
```

Claramente inserido para "simular throttling" durante desenvolvimento. Em produção, isso adiciona **800ms a todas as requisições**, sem necessidade alguma.

**Fix:** Remover. Se rate limiting for necessário, implementar com padrão correto (token bucket, semaphore).

---

#### Bug #3 — `SIZE_SCORES` com chaves inconsistentes

O mapa `SIZE_SCORES` em `scoreWeights.ts` define chaves como `"MICRO"`, `"PEQUENA"`. Porém a BrasilAPI retorna valores como `"MICRO EMPRESA"` e `"EMPRESA DE PEQUENO PORTE"`.

```typescript
// scoreWeights.ts
const SIZE_SCORES = { MICRO: 75, PEQUENA: 80 ... };

// CompanyService.ts
const sizeKey = (raw.porte || "").toUpperCase(); // "MICRO EMPRESA" — não faz match
const sizeScore = SIZE_SCORES[sizeKey] ?? 50;    // cai no fallback para quase todos
```

Resultado: a vasta maioria das empresas recebe score de porte = 50 silenciosamente.

**Fix:** Normalizar `sizeKey` para fazer match ou unificar o mapeamento numa única estrutura.

---

### 🟡 Riscos de Produção

#### Risco #1 — Campo `raw` exposto na resposta HTTP

O DTO `CompanyResponseDTO` inclui `raw?: any`, e o service retorna `{ ..., raw }`. Isso vaza para o frontend todos os dados brutos da BrasilAPI. Em modo "developer", o frontend exibe um `JSON.stringify(data)` completo.

**Fix:** Remover `raw` do DTO e do retorno do service em produção.

#### Risco #2 — Ausência total de rate limiting

Sem autenticação e sem rate limiting, o endpoint `POST /api/company/enrich` está aberto para abuso via automação, pode atingir limites da BrasilAPI e derrubar o serviço para todos os usuários.

**Fix:** Implementar rate limiting por IP (`express-rate-limit`) e, em SaaS, por usuário autenticado. Adicionar cache de CNPJ com TTL de 24h.

#### Risco #3 — `ValidCode` lança exceção para CNAE 0

`new ValidCode(new DefaultCode(raw.cnae_fiscal || 0))` — se `cnae_fiscal` vier como `0` ou `null`, o fallback é `0`, que é falsy. `ValidCode.getValue()` lança exceção, e o erro vira um 500 genérico sem mensagem clara.

**Fix:** Usar `NullCode` como fallback em vez de `ValidCode`.

#### Risco #4 — Sem logging estruturado no catch de 500

```typescript
// controller — err nunca é logado
res.status(500).json({ error: "Erro interno", code: "INTERNAL_ERROR" });
```

Em produção, erros inesperados são completamente invisíveis.

**Fix:** Adicionar `console.error(err)` (ou logger estruturado como `pino`) no catch genérico.

---

### 🟠 Code Smells Prioritários

**Smell #1 — `any` em pontos críticos**
`ICNPJRepository.findByCNPJ(): Promise<any>`, `BrasilAPICompany(private raw: any)`, `generateInsights(raw: any)` e `raw?: any` no DTO. Cria interface `BrasilAPIRawResponse` com os campos tipados para resolver.

**Smell #2 — Lógica de score triplicada**
O cálculo de `ageYears` é copiado literalmente em 3 lugares: `enrich()`, `calculateScore()` e `generateInsights()`. Qualquer mudança precisa ser feita em 3 locais.

**Smell #3 — Breakdown incompleto no frontend**
O objeto `breakdown` tem 5 dimensões mas o `CompanyCard` só exibe 2 (`companyAge` e `contact`). As dimensões `isActive`, `size` e `cnae` são enviadas mas silenciosamente ignoradas.

**Smell #4 — CRLF em arquivos shared**
`specification/index.ts` e `contactValidator.ts` usam terminações CRLF enquanto o resto usa LF. Indica ausência de `.gitattributes` — pode causar problemas em CI/CD Linux.

**Smell #5 — `ICNPJRepository` mal posicionado**
A interface está definida dentro de `BrasilAPIRepository.ts`, junto com as classes de erro. Interfaces deveriam estar em sua própria camada de abstração, não no arquivo de implementação.

**Smell #6 — `LeadContext` criado mas não utilizado**
`LeadContext` é criado, `LeadProvider` wrappa o app, mas nenhum componente chama `useLead()`. O estado de lead vive em `useCNPJSearch()`. É infraestrutura morta.

**Smell #7 — Validação de CNPJ duplicada no frontend**
O frontend usa `services/cnpjValidator.ts` local em vez de importar de `shared/types/domain`. Se as lógicas divergirem, haverá falsos positivos/negativos.

---

## Parte 3 — Arquitetura

### Estrutura atual

```
HTTP Layer (Express + CORS)
    ↓
CompanyController — valida input, mapeia erros para HTTP codes
    ↓
CompanyService    — orquestra enriquecimento, scoring e insights [GORDO DEMAIS]
    ↓
BrasilAPIRepository — HTTP client para BrasilAPI [SEM CACHE]
    ↓
Shared Domain — Value Objects, Decorators, Specifications, DTOs [PONTO FORTE]
```

### Problemas arquiteturais

| Problema | Impacto |
|---|---|
| `CompanyService` com múltiplas responsabilidades | Faz enriquecimento, scoring E geração de insights. Viola SRP. Dificulta testes. |
| Sem camada de cache | Cada request faz uma call externa. CNPJs são dados públicos estáveis — ideais para cache longo. |
| `scoreWeights.ts` solto na raiz de `src/` | Configuração de domínio crítica fora de qualquer camada. |
| Sem autenticação/multitenancy | Para SaaS: cada empresa precisa de contexto de tenant. |
| Sem persistência | Cada busca é efêmera. Histórico de leads é feature básica de produto. |

### Estrutura recomendada para SaaS

```
src/
├── domain/
│   ├── company/       ← mover shared/types aqui
│   ├── lead/          ← novo: entidade Lead com histórico
│   └── scoring/       ← extrair ScoreCalculator + InsightGenerator
├── application/
│   ├── usecases/
│   │   ├── EnrichLead.ts
│   │   ├── GetLeadHistory.ts
│   │   └── ExportLeads.ts
│   └── ports/         ← interfaces (ICNPJRepository, ILeadRepository, ICache)
├── infrastructure/
│   ├── http/
│   │   ├── BrasilAPIAdapter.ts
│   │   └── ReceitaWSAdapter.ts    ← segunda fonte de dados
│   ├── cache/
│   │   └── RedisCache.ts
│   ├── db/
│   │   └── PostgresLeadRepository.ts
│   └── auth/
│       └── JWTMiddleware.ts
└── presentation/
    ├── controllers/
    └── middlewares/
```

### Implementação recomendada — Cache de CNPJ

```typescript
class CachedCNPJRepository implements ICNPJRepository {
  constructor(
    private repo: ICNPJRepository,
    private cache: ICache,
    private ttl = 86400 // 24h — dados da RF não mudam com frequência
  ) {}

  async findByCNPJ(cnpj: string): Promise<BrasilAPIRawResponse> {
    const cached = await this.cache.get(`cnpj:${cnpj}`);
    if (cached) return JSON.parse(cached);

    const data = await this.repo.findByCNPJ(cnpj);
    await this.cache.set(`cnpj:${cnpj}`, JSON.stringify(data), this.ttl);
    return data;
  }
}

// routes/index.ts — composição com cache
const redis = new RedisCache(process.env.REDIS_URL);
const baseRepo = new BrasilAPIRepository();
const repo = new CachedCNPJRepository(baseRepo, redis);
const service = new CompanyService(repo);
```

---

## Parte 4 — Evolução para SaaS

### Proposta de valor revisada

> **LeadIntel não é um "lookup de CNPJ".** O diferencial real é transformar dados públicos em sinais de vendas acionáveis — especificamente para times de SDR/BDR que precisam decidir em segundos se um lead vale o esforço de outreach. O score + insights é o produto; o CNPJ é só o input.

### Planos sugeridos

| | Free | Pro | Team |
|---|---|---|---|
| **Preço** | R$ 0/mês | R$ 149/mês | R$ 499/mês |
| Consultas | 50/mês | 1.000/mês | Ilimitado |
| Score | Básico (3 dim.) | Completo + breakdown | Completo + breakdown |
| Histórico | ✗ | ✓ | ✓ |
| Exportação CSV/JSON | ✗ | ✓ | ✓ |
| ICP customizável | ✗ | ✓ | ✓ |
| Multi-usuário | ✗ | ✗ | 5 seats |
| Integração CRM | ✗ | Webhook/Zapier | Pipedrive, HubSpot |
| API própria | ✗ | ✗ | ✓ com key |

### Fontes de enriquecimento adicionais

| Fonte | Dados | Viabilidade |
|---|---|---|
| ReceitaWS | Dados mais frescos, quadro societário completo | Fácil |
| LinkedIn | Headcount real, crescimento de equipe, tech stack | Médio |
| Similarweb / Semrush API | Tráfego do site — proxy de saúde do negócio digital | Médio |
| Google Maps Places | Avaliações, presença online, horários — empresa ativa de fato | Fácil |
| Crunchbase API | Rodadas de investimento — sinal de crescimento | Caro |
| ReclameAqui | Índice de reclamações — saúde do relacionamento com clientes | Médio |

### Diferenciais competitivos a construir

**ICP Score personalizado:** Permitir que cada cliente configure seu Ideal Customer Profile — quais CNAEs, porte, região e tempo de empresa são mais valiosos para ele. O score se torna "quão próximo esse lead está do meu ICP".

**Sinais de timing:** Detectar eventos que indicam momento de compra — empresa registrada há menos de 1 ano (fase de setup), mudança recente de endereço, aumento de CNAEs secundários (expansão), novo sócio (mudança de gestão).

**Extensão de browser:** Enriquecer leads diretamente no LinkedIn, RD Station ou Pipedrive sem sair da ferramenta. Modelo de distribuição viral B2B comprovado.

**Upload em lote:** CSV com lista de CNPJs → processamento assíncrono (BullMQ + Redis) → webhook/email com resultado. Abre segmento de marketing operations e prospecção em escala.

### Melhorias de UX/produto (curto prazo)

| Oportunidade | Impacto |
|---|---|
| Histórico de consultas locais | Salvar últimos 10 CNPJs em localStorage com score — reduz fricção para reabrir um lead |
| Copiar dados formatados | Botão "Copiar para clipboard" no formato de nota de CRM — muito requisitado por SDRs |
| Comparar dois leads | Side-by-side de dois CNPJs para decidir qual priorizar — diferencial forte |
| Score explicado | Tooltip no score mostrando o breakdown com peso de cada dimensão. "Por que 73?" |
| Exportar para CSV/JSON | Resultado exportável para planilha ou CRM |

---

## Parte 5 — Roadmap de Melhorias

### Curto prazo — 1 a 2 semanas

Correções críticas e quick wins.

1. **Remover o delay de 800ms** — uma linha, 800ms de latência eliminados imediatamente
2. **Tipar `BrasilAPIRawResponse`** — criar interface para o retorno da BrasilAPI, revelará o Bug #3 automaticamente e elimina os `any` críticos
3. **Remover `calculateScore()` duplicado** — extrair para `ScoreCalculator` separado
4. **Remover `raw` do DTO/response** — não expor dados internos da API no response HTTP
5. **Exibir breakdown completo no frontend** — mostrar as 5 dimensões no CompanyCard (10 linhas de código)
6. **Adicionar logging no catch de 500** — `console.error(err)` no catch genérico do controller
7. **Corrigir chaves de SIZE_SCORES** — normalizar para fazer match com o retorno da BrasilAPI
8. **Unificar validação de CNPJ no frontend** — importar de `shared/types/domain` em vez de arquivo local

### Médio prazo — 1 a 2 meses

Produto funcional e escalável.

9. **Cache de CNPJs com Redis/Upstash** — TTL de 24h, latência cai de ~1.5s para ~50ms nos hits
10. **Autenticação JWT + multitenancy** — fundação do SaaS; sem isso não há billing, cotas ou histórico por usuário
11. **Persistência de leads consultados** — PostgreSQL com tabela de consultas por usuário
12. **Rate limiting por usuário** — `express-rate-limit` por IP e por token JWT; cotas por plano
13. **Testes unitários do domínio** — o domínio rico é facilmente testável; cobrir `validateCNPJ`, `WeightedLeadScore`, `contactValidator`, `ScoreCalculator` com Vitest (cobertura >80%)
14. **Validação de body com Zod** — schema validation no controller
15. **Logger estruturado (pino)** — request ID, duração de chamadas externas, erros com stack

### Longo prazo — 3 a 6 meses

Produto diferenciado e escalável.

16. **ICP Score configurável por usuário** — interface para configurar pesos e filtros do score
17. **Segunda fonte de dados (ReceitaWS)** — fallback automático quando BrasilAPI falha
18. **Extensão Chrome** — enriquecimento inline no LinkedIn, principal canal de distribuição viral B2B
19. **Upload em lote + processamento assíncrono** — CSV upload → fila (BullMQ + Redis) → webhook/email
20. **API pública + documentação Swagger** — permite integração em sistemas dos clientes; churn muito menor (embedded)

---

## Conclusão

Este é um projeto genuinamente acima da média para um teste técnico. O uso de Decorator Pattern, Specification Pattern, Value Objects e uma UI com atenção a detalhes de interação demonstra maturidade de engenharia.

Os gaps existem principalmente em segurança (raw exposto, sem rate limiting), testabilidade (zero testes) e alguns bugs silenciosos (delay de 800ms, SIZE_SCORES com chaves erradas) — não em arquitetura fundamentalmente errada.

Com as correções de curto prazo e a evolução de médio prazo descritas acima, esta base já suportaria um produto SaaS funcional com clientes pagantes.

---

*Análise gerada em maio de 2026 · LeadIntel Code Review*

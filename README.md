# LeadIntel — Enriquecimento de Leads B2B

> Plataforma que transforma dados de CNPJ em insights comerciais acionáveis.

**Criadora:** Aline de Abreu Espindola
**Tempo gasto:** ~10 horas  
**IAs utilizadas:** Claude (Anthropic), Gemini e ChatGPT

---

## Índice

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Roadmap e Processo](#roadmap-e-processo)
3. [Etapa 1 — UX: Personas](#etapa-1--ux-personas)
4. [Etapa 2 — UI: Design System](#etapa-2--ui-design-system)
5. [Etapa 3 — Código: Arquitetura](#etapa-3--código-arquitetura)
6. [Etapa 4 — Análise e Melhorias](#etapa-4--análise-e-melhorias)
7. [Pré-requisitos](#pré-requisitos)
8. [Instalação](#instalação)
9. [Variáveis de Ambiente](#variáveis-de-ambiente)
10. [Rodar Localmente](#rodar-localmente)
11. [Build para Produção](#build-para-produção)
12. [Exemplos de Teste](#exemplos-de-teste)
13. [Como a IA Ajudou](#como-a-ia-ajudou)
14. [Decisões de Projeto](#decisões-de-projeto)
15. [Se Tivesse Mais Tempo](#se-tivesse-mais-tempo)

---

## Sobre o Projeto

O LeadIntel resolve um problema real de equipes comerciais: receber um lead com nome, e-mail, telefone e CNPJ e não saber rapidamente se ele vale o esforço de abordagem. A plataforma consulta os dados da empresa via [BrasilAPI](https://brasilapi.com.br/docs#tag/CNPJ), processa e traduz as informações técnicas (CNAE, natureza jurídica, porte) em linguagem de negócios, calcula um score de priorização e gera insights acionáveis para o time comercial.

---

## Roadmap e Processo

O projeto foi estruturado como se fosse um produto real, com cliente e usuário reais — partindo de UX, passando por UI, implementação e análise crítica.

```
LeadIntel
├── Contexto: Estruturar projeto como produto real
├── Papel da IA: Engenharia de Prompt + Documentação
└── Etapas
    ├── UX → Persona + Público-alvo
    ├── UI → Design System + Esboço
    └── Frontend → Arquitetura + POO + Design Patterns
                   + Variant Components + Lead Scoring
```

---

## Etapa 1 — UX: Personas

Antes de escrever uma linha de código, o primeiro passo foi definir **para quem** o software resolve o problema. Para isso, foi usado o framework **PACIF** de engenharia de prompt:

| Elemento | Descrição |
|----------|-----------|
| **P**apel | UX Designer Sênior + Product Designer com 10+ anos em SaaS B2B/B2C |
| **A**ção | Analisar o escopo e definir 3 personas estratégicas |
| **C**ontexto | Software de gestão e conversão de leads |
| **I**ntenção | Gerar personas que guiem decisões de UX, UI e priorização de features |
| **F**ormato | Estruturado por seções: identificação, comportamento, objetivos, dores, necessidades, direcionamentos de UX |

O resultado foram três personas distintas, cada uma representando um segmento real de usuário do sistema:

---

### Persona 1 — Lucas Andrade (SDR)

**24 anos · SDR (Pré-vendas) · SaaS B2B · Iniciante/Intermediário · São Paulo - SP**

> *"Eu gasto mais tempo pesquisando do que vendendo."*

Lucas trabalha com metas diárias agressivas de contatos. Precisa qualificar leads com agilidade para repassar os melhores ao time de closers. Usa múltiplas abas (Google, LinkedIn, Receita Federal) e perde tempo com dados técnicos que não consegue interpretar.

**Quer:** resultado rápido e confiável, informações claras e traduzidas, interface simples sem necessidade de treinamento.  
**Odia:** ferramentas lentas, termos técnicos como CNAE e natureza jurídica sem contexto, dados inconsistentes.  
**Impacto no design:** interface mínima, score em destaque, linguagem humana, mobile-friendly.

---

### Persona 2 — Fernanda Ribeiro (Head de Vendas)

**36 anos · Head de Vendas · SaaS B2B · Avançado · São Paulo - SP**

> *"Tenho dados, mas não tenho critério claro de priorização. Preciso de padronização e visibilidade para tomar decisões que realmente impactam o funil."*

Fernanda gerencia time de SDRs e Closers, define o ICP e acompanha métricas do funil diariamente. Toma decisões baseadas em dados e precisa de visibilidade estratégica, não operacional.

**Quer:** dashboards analíticos, critérios de scoring personalizáveis, segmentação avançada, integração com CRM e BI.  
**Odia:** leads desqualificados que consomem tempo do time, falta de padronização, dados difíceis de interpretar.  
**Impacto no design:** modo analítico com score breakdown, métricas comparativas, exportação de relatórios.

---

### Persona 3 — Rafael Costa (Founder / Growth Hacker)

**29 anos · Fundador & Growth · Startup Early Stage · Intermediário/Avançado · Belo Horizonte - MG**

> *"Se eu tiver os dados certos e uma boa API, eu construo o resto. Preciso de velocidade para testar hipóteses e escalar o que funciona."*

Rafael faz de tudo: marketing, vendas, produto e análise de dados. Constrói automações com APIs e Zaps, valida hipóteses de mercado e escala o que funciona. Pensa em integração, não em interface.

**Quer:** API robusta e bem documentada, enriquecimento em lote, flexibilidade e customização, webhooks.  
**Odia:** ferramentas caras e pouco flexíveis, dados dispersos, processos manuais que não escalam.  
**Impacto no design:** modo developer com JSON raw, endpoint copiável, exportação CSV/JSON.

---

## Etapa 2 — UI: Design System

Com as personas definidas, o Design System foi construído para atender os três perfis com **camadas progressivas de interface**:

| Modo | Persona | Princípio |
|------|---------|-----------|
| **Simples** | Lucas (SDR) | 3 informações, 1 decisão |
| **Analítico** | Fernanda (Head) | Contexto + comparabilidade |
| **Avançado (Dev)** | Rafael (Growth) | Dados completos + API access |

**Decisões tipográficas:**
- `DM Serif Display` para score e títulos de empresa — autoridade e clareza
- `IBM Plex Sans` para toda a interface — tecnológico, legível em densidade
- `IBM Plex Mono` para CNPJs, códigos e dados técnicos — coerência visual

**Sistema de score por temperatura:**
- 🔥 **Quente (80–100):** `#F5521A` — Lead prioritário
- 🌤 **Morno (50–79):** `#F5A623` — Lead em qualificação
- ❄️ **Frio (0–49):** `#6B7C93` — Baixa prioridade

O design system completo (cores, tipografia, espaçamento, componentes, estados, microcopy) está em [`docs/design-system.md`](./docs/design-system.md).

---

## Etapa 3 — Código: Arquitetura

### Arquitetura Monolítica Modular (Monorepo)

O projeto adota uma **arquitetura monolítica modular** com três camadas bem delimitadas:

```
leadintel/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Node.js + Express + TypeScript
└── shared/            # Tipagens e utilitários compartilhados
    └── types/
        ├── domain/    # Value objects, entidades, specifications
        ├── dto/       # Contratos de API (request/response)
        └── utils/     # Validadores compartilhados
```

**Por que monolítico modular?**

A separação em `frontend`, `backend` e `shared` garante fronteiras claras de responsabilidade sem a complexidade operacional de microsserviços. O `shared` é o diferencial: ao centralizar tipagens e validações, elimina duplicação de código e garante que frontend e backend falem a mesma linguagem de tipos — qualquer quebra de contrato de API é capturada em tempo de compilação pelo TypeScript.

**Vantagens do `shared` com tipos compartilhados:**
- **Type safety de ponta a ponta:** o mesmo `CompanyResponseDTO` é usado no backend para serializar e no frontend para consumir — se um campo mudar, ambos quebram em compile time
- **DRY estrutural:** validações como `validateContact` são escritas uma vez e usadas em qualquer camada
- **Documentação viva:** o contrato de API está no código, não em uma wiki desatualizada

---

### Design Patterns Utilizados

**1. Value Objects (Domain-Driven Design)**

Cada campo de domínio é encapsulado em um objeto com regras próprias. Em vez de strings soltas, o sistema usa tipos ricos:

```typescript
const cnpj = new FormattedCNPJ(new ValidCNPJ(new DefaultCNPJ("11222333000181")));
cnpj.getValue(); // "11.222.333/0001-81"
```

Isso elimina validação espalhada pelo código e centraliza regras de negócio nos próprios tipos.

**2. Decorator Pattern**

`ScoredCompany` adiciona score e insights a qualquer implementação de `Company` sem modificar a classe original:

```typescript
const base = new BrasilAPICompany(rawData, leadData);
const scored = new ScoredCompany(base, score, insights);
// scored implementa Company, mas retorna os campos de scoring sobrescritos
```

Permite estender comportamento de forma composicional, sem herança rígida.

**3. Null Object Pattern**

`NullCompany` implementa a interface `Company` lançando erros descritivos para cada campo. Isso elimina verificações de nulo espalhadas e falha de forma explícita e rastreável.

**4. Repository Pattern**

`BrasilAPIRepository` encapsula toda a lógica de comunicação com a API externa. O `CompanyService` nunca sabe de onde vêm os dados — apenas chama `repo.findByCNPJ()`. Isso facilita mockar a dependência em testes e trocar a fonte de dados no futuro.

**5. Strategy Pattern (via WeightedLeadScore)**

O cálculo de score é injetável: pesos por dimensão (status ativo, idade da empresa, porte, CNAE) são configuráveis em `scoreWeights.ts` sem alterar a lógica de cálculo.

**6. Specification Pattern**

Filtros de empresa são compostos de forma declarativa:

```typescript
const isViableLead = new ActiveCompanySpecification()
  .and(new SizeSpecification("pequena"))
  .and(new StateSpecification("SP"));

isViableLead.isSatisfiedBy(company); // true ou false
```

As especificações implementadas são: `ActiveCompanySpecification`, `NameSpecification`, `CNPJSpecification`, `StateSpecification` e `SizeSpecification`. Cada uma poderia (e idealmente deveria) estar em um arquivo separado para melhor organização e arquivos menores.

---

### Programação Orientada a Objetos (POO)

O backend é fortemente orientado a objetos, com uso de todos os pilares:

**Abstração:** A interface `Company` define o contrato público (19 métodos get) sem expor implementação. O serviço programa contra a interface, não contra implementações concretas.

**Encapsulamento:** Cada Value Object expõe apenas `getValue()`. A representação interna, formatação e validação ficam privadas. `BrasilAPICompany` delega para um `DefaultCompany` interno — os detalhes de construção são invisíveis para quem usa.

**Herança:** `AbstractSpecification<T>` implementa os combinadores `and()`, `or()` e `not()` uma única vez. Todas as specifications concretas herdam e apenas precisam implementar `isSatisfiedBy()`.

**Polimorfismo:** `CompanyService` recebe qualquer implementação de `ICNPJRepository`. Em produção usa `BrasilAPIRepository`; em testes, pode receber um mock que retorna fixtures. `TemperatureScore` aceita qualquer `Score` e adiciona a lógica de temperatura por composição.

---

### Estrutura do Frontend

```
frontend/src/
├── api/           # companyApi.ts — cliente HTTP tipado
├── components/
│   ├── domain/    # CNPJInput, CompanyCard, ScoreIndicator, InsightBlock...
│   ├── layout/    # Header
│   └── ui/        # Button (base)
├── contexts/      # LeadContext — estado global da busca
├── hooks/         # useCNPJSearch, useCNPJMask, useViewMode
├── pages/         # SearchPage
├── services/      # cnpjValidator.ts
└── types/         # index.ts
```

Os componentes de domínio são **variant components**: `CompanyCard` renderiza diferente nos modos simples, analítico e avançado, controlados pelo hook `useViewMode` e pelo `LeadContext`.

---

## Etapa 4 — Análise e Melhorias

Além da análise própria, foi feita uma análise com IA (disponível em [`docs/leadintel-analysis.html`](./docs/leadintel-analysis.html) e em `.md` no mesmo diretório) sobre melhorias e correções — a maior parte foi implementada.

**Principais melhorias identificadas e aplicadas:**

- Substituição de score calculado inline por `WeightedLeadScore` com pesos configuráveis
- Introdução do `TemperatureScore` para encapsular lógica de temperatura
- Adição do Specification Pattern para filtros compostos
- Score de contato via `validateContact` do shared
- Remoção do método `calculateScore` duplicado no `CompanyService` (agora marcado como `@deprecated`)

**Melhorias futuras identificadas (não implementadas por tempo):**

- Cada `Specification` em seu próprio arquivo (hoje estão em `index.ts` único)
- `CompanyService` com melhor organização interna de responsabilidades
- Score de contato usando o Specification Pattern completo

---

## Pré-requisitos

- Node.js 18+
- npm 9+

---

## Instalação

```bash
# Clone ou extraia o projeto
cd leadintel

# Instalar dependências (backend + frontend)
npm install         # instala concurrently na raiz
cd backend && npm install
cd ../frontend && npm install
```

---

## Variáveis de Ambiente

### Backend (`backend/.env`)

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3001/api
```

Crie os arquivos `.env` copiando os exemplos acima. **Nenhuma variável externa obrigatória** — a BrasilAPI é pública e não requer chave de API.

---

## Rodar Localmente

```bash
# Na raiz do projeto (ambos simultaneamente)
npm run dev

# Ou separadamente:
npm run dev:backend   # http://localhost:3001
npm run dev:frontend  # http://localhost:5173
```

Acesse: **http://localhost:5173**

---

## Build para Produção

```bash
npm run build
# Backend compilado: backend/dist/
# Frontend compilado: frontend/dist/
```

O frontend pode ser servido por qualquer servidor estático (nginx, Vercel, Netlify).  
O backend pode ser deployado em qualquer plataforma Node.js (Railway, Fly.io, Render).

---

## Exemplos de Teste

Para testar a aplicação, utilize os CNPJs abaixo com dados de lead fictícios:

| Nome | Email | Telefone | CNPJ | Cenário esperado |
|------|-------|----------|------|-----------------|
| João Silva | joao@example.com | (11) 99999-0001 | 11.222.333/0001-81 | Empresa ativa, tech |
| Maria Lima | maria@empresa.com | (21) 98888-0002 | 33.000.167/0001-01 | Banco do Brasil — grande porte |
| Carlos Rocha | carlos@startup.io | (51) 97777-0003 | 45.997.418/0001-53 | Startup pequena, recente |
| Ana Costa | ana@inativa.com | (31) 96666-0004 | 07.526.557/0001-00 | Empresa inativa/encerrada |
| Pedro Faria | pedro@mei.com | (85) 95555-0005 | 40.432.544/0001-47 | MEI — decisor acessível |

> Dica: CNPJs inválidos (ex: `11.111.111/1111-11`) devem disparar validação de erro inline no campo.

---

## Como a IA Ajudou

As IAs foram usadas em três frentes distintas ao longo do projeto:

**Engenharia de Prompt (UX):** O prompt estruturado com o framework PACIF gerou as três personas estratégicas com profundidade e acionabilidade reais — resultado que levaria horas de pesquisa e síntese manual.

**Design System:** Prompt estruturado gerou o design system inicial com tokens de cor, tipografia, componentes e estados de aplicação. Serviu como base para refinamentos e decisões de produto.

**Claude (Anthropic):** Responsável pela geração inicial da estrutura do projeto — arquitetura de pastas, interfaces TypeScript, padrões de design e lógica de domínio. Todas as decisões foram revisadas, ajustadas e validadas manualmente. A análise crítica do código (disponível em `docs/`) também foi gerada com IA e usada como guia de refatoração.

O papel da IA foi de **acelerador e revisor**, não de substituto para decisões de produto e arquitetura.

---

## Decisões de Projeto

**TypeScript strict em todo o projeto:** Tipos explícitos e sem `any` (exceto no mapeamento do raw da BrasilAPI, onde a tipagem é necessariamente parcial) garantem confiança nas refatorações.

**BrasilAPI como fonte única:** API pública, sem necessidade de chave, com cobertura completa de CNPJs brasileiros. Suficiente para o escopo do desafio.

**Monorepo com shared:** Alternativa deliberada a duplicar tipos entre frontend e backend. O custo de setup é compensado pela garantia de contrato.

**Conventional Commits:** Todo o histórico de git segue a convenção `feat:`, `fix:`, `refactor:`, `chore:`, `style:` — facilitando rastreabilidade e geração de changelog.

**Sem autenticação:** Escopo do desafio. Em produção, o endpoint de enriquecimento exigiria autenticação (JWT ou API key).

**Sem persistência:** Dados não são salvos. Em produção, um histórico de consultas por usuário seria essencial para a Fernanda (Head de Vendas) analisar padrões.

---

## Se Tivesse Mais Tempo

**Features extras planejadas:**
- Testes automatizados (unitários para Value Objects e de integração para o endpoint)
- Salvar histórico de leads no `localStorage` ou banco de dados
- Análise de lead com IA generativa (ex: resumo de abordagem personalizado)
- Devin IA para automatizar novas features e correções de bugs

**Refatorações pendentes:**
- Separar cada `Specification` em arquivo próprio (hoje estão consolidadas em `index.ts`)
- Usar Specification Pattern também no cálculo de score de contato
- Reorganizar `CompanyService` para separar melhor as responsabilidades (geração de insights em classe própria)
- Adicionar paginação e busca em lote para o Rafael (Growth)
- Modo de comparação de dois CNPJs lado a lado para a Fernanda
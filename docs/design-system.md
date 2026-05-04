# Design System — Lead Intelligence Platform
> Versão 1.0 | B2B SaaS | Decisão > Dados

---

## 🧭 Princípios de UX

### 1. Decisão antes de dado
Cada elemento visual existe para reduzir o tempo até a ação. Nunca exibimos dados brutos sem contexto interpretado. Um CNPJ nunca aparece sozinho — ele aparece com seu significado de negócio.

### 2. Velocidade como respeito
O SDR tem 8 segundos por lead. Cada clique a mais é receita perdida. A interface deve responder a perguntas, não fazer o usuário pensar.

### 3. Hierarquia de confiança
Quem olha essa tela está tomando uma decisão comercial. A confiabilidade visual (tipografia limpa, cores consistentes, estados claros) é parte do produto.

### 4. Camadas progressivas
O mesmo dado pode ser consumido em 3 profundidades:
- **Simples**: Sim / Não / Score
- **Analítico**: Contexto + comparação
- **Técnico**: Dados brutos + API

---

## 🎨 Cores

### Filosofia de cor
Paleta construída em torno de **decisão e urgência comercial**. Tons de azul profundo como base institucional, verde para oportunidade confirmada, âmbar para atenção qualificada e vermelho reservado para bloqueio.

Fundo escuro (`#0D1117`) comunica densidade de informação sem cansar a visão em sessões longas.

---

### Primária — Ação e Identidade
| Token | Hex | Uso |
|---|---|---|
| `primary.500` | `#2F6FED` | Botões principais, links ativos, foco |
| `primary.600` | `#1A56C4` | Hover de botões, estados pressionados |
| `primary.400` | `#5B8FF9` | Ícones secundários, bordas de destaque |
| `primary.100` | `#EBF2FF` | Background de badges primários (tema claro) |
| `primary.900` | `#0A2463` | Texto em fundo claro com autoridade |

---

### Score — O coração do produto
O sistema de score é o diferencial competitivo. As cores precisam comunicar urgência comercial de forma imediata.

| Token | Hex | Temperatura | Uso |
|---|---|---|---|
| `score.hot` | `#F5521A` | 🔥 Quente (score 80–100) | Lead prioritário, badge de alta conversão |
| `score.hot.bg` | `#FFF1EC` | — | Background de cards de leads quentes |
| `score.warm` | `#F5A623` | 🌤 Morno (score 50–79) | Lead em qualificação, atenção necessária |
| `score.warm.bg` | `#FFF8EC` | — | Background de cards de leads mornos |
| `score.cold` | `#6B7C93` | ❄️ Frio (score 0–49) | Lead não qualificado, baixa prioridade |
| `score.cold.bg` | `#F5F7FA` | — | Background neutro para leads frios |

---

### Feedback Semântico
| Token | Hex | Uso |
|---|---|---|
| `success.500` | `#1DB954` | Empresa ativa, dado confirmado, sucesso de busca |
| `success.100` | `#E8F9EE` | Background de mensagens de sucesso |
| `warning.500` | `#F5A623` | Dado incompleto, empresa em atenção |
| `warning.100` | `#FFF8EC` | Background de alertas |
| `error.500` | `#E5303B` | CNPJ inválido, erro de API, empresa inativa |
| `error.100` | `#FDECEA` | Background de erros |

---

### Superfície — Camadas de Interface
Sistema de 5 camadas para criar profundidade sem sombra excessiva.

| Token | Hex (Dark) | Hex (Light) | Descrição |
|---|---|---|---|
| `surface.base` | `#0D1117` | `#F8FAFC` | Fundo raiz da aplicação |
| `surface.raised` | `#161C26` | `#FFFFFF` | Cards, painéis, modais |
| `surface.overlay` | `#1E2737` | `#F1F5F9` | Hover, dropdowns, tooltips |
| `surface.border` | `#2A3548` | `#E2E8F0` | Bordas, divisores, separadores |
| `surface.ghost` | `#111827` | `#F9FAFB` | Áreas de baixo contraste / fundo de tabelas |

---

### Escala Neutra
| Token | Hex | Uso |
|---|---|---|
| `neutral.900` | `#0F172A` | Texto primário (tema claro) |
| `neutral.700` | `#334155` | Texto secundário, labels |
| `neutral.500` | `#64748B` | Texto terciário, placeholders |
| `neutral.300` | `#CBD5E1` | Bordas sutis, ícones inativos |
| `neutral.100` | `#F1F5F9` | Backgrounds de seções |
| `neutral.50` | `#F8FAFC` | Fundo geral (tema claro) |

---

## 🔤 Tipografia

### Filosofia
Hierarquia construída para **scanning de 3 segundos**. O olho deve capturar Score → Nome da empresa → Segmento → Detalhe, nessa ordem.

### Stack tipográfica
- **Display / Score / Hero**: `DM Serif Display` — autoridade, clareza, legibilidade em tamanhos grandes
- **Interface / Labels / Corpo**: `IBM Plex Sans` — tecnológico, preciso, excelente legibilidade em telas densas
- **Dados técnicos / CNPJ / Código**: `IBM Plex Mono` — coerência visual com dados estruturados

```css
font-family: 'DM Serif Display', serif;       /* display */
font-family: 'IBM Plex Sans', sans-serif;     /* interface */
font-family: 'IBM Plex Mono', monospace;      /* técnico */
```

---

### Escala Tipográfica

| Role | Fonte | Tamanho | Peso | Uso |
|---|---|---|---|---|
| `display` | DM Serif Display | 32px / 2rem | 400 | Score principal, título de empresa |
| `heading.lg` | IBM Plex Sans | 24px / 1.5rem | 600 | Seção principal de resultado |
| `heading.md` | IBM Plex Sans | 18px / 1.125rem | 600 | Título de card, subseção |
| `heading.sm` | IBM Plex Sans | 14px / 0.875rem | 700 | Label uppercase de seção |
| `body.lg` | IBM Plex Sans | 16px / 1rem | 400 | Texto descritivo principal |
| `body.md` | IBM Plex Sans | 14px / 0.875rem | 400 | Conteúdo de card, parágrafos |
| `body.sm` | IBM Plex Sans | 12px / 0.75rem | 400 | Texto auxiliar, rodapés de card |
| `insight` | IBM Plex Sans | 14px / 0.875rem | 500 | Insight blocks, callouts |
| `label` | IBM Plex Sans | 11px / 0.6875rem | 700 | Labels uppercase, categoria |
| `data` | IBM Plex Mono | 13px / 0.8125rem | 400 | CNPJ, códigos, dados brutos |
| `data.lg` | IBM Plex Mono | 15px / 0.9375rem | 500 | CNAE traduzido, telefone |

---

### Regra de line-height
- Display e headings: `1.2`
- Body e insights: `1.5`
- Labels e mono: `1.4`

---

## 📐 Espaçamento e Grid

### Base: Sistema 4pt
Todos os valores são múltiplos de 4px. Isso garante harmonia visual sem esforço manual.

```
4px   → micro (gap entre ícone e label)
8px   → xs (padding interno de badge)
12px  → sm (gap entre elementos de mesmo grupo)
16px  → md (padding de card compacto, gap de formulário)
20px  → lg (espaço entre seções de card)
24px  → xl (padding padrão de card)
32px  → 2xl (gap entre cards, padding de container)
40px  → 3xl (seção de página)
48px  → 4xl (divisor de bloco)
64px  → 5xl (espaço entre blocos maiores)
```

---

### Grid de Layout

**Tela principal (resultado de busca)**
```
12 colunas | gap: 24px | max-width: 1280px | padding horizontal: 32px
```

| Breakpoint | Colunas | Layout |
|---|---|---|
| Mobile (`< 640px`) | 1 col | Stack vertical |
| Tablet (`640–1024px`) | 2 col | Card principal + sidebar |
| Desktop (`> 1024px`) | 3 col | Score | Empresa | Insights |

---

### Densidade de interface
Otimizada para **produtividade**, não para marketing:
- Cards compactos com informação densa (não espaçosos como landing pages)
- Padding interno de card: `24px`
- Gap entre cards: `16px`
- Altura mínima de linha em listas: `48px` (boa area de toque + escaneamento)

---

## 🧩 Componentes

### 1. `<CNPJInput>` — Input Inteligente de CNPJ

**Comportamento:**
- Máscara automática: `00.000.000/0000-00`
- Validação em tempo real (mod11)
- Estado: `idle | typing | validating | valid | invalid`
- Auto-submit quando CNPJ completo e válido

**Anatomia:**
```
[Label "CNPJ da empresa"]
[Ícone de empresa] [Campo de texto] [Spinner / Check / X]
[Mensagem de status]
```

**Estados visuais:**
- `idle`: Borda `surface.border`, placeholder cinza
- `typing`: Borda `primary.500`, brilho sutil (box-shadow)
- `valid`: Borda `success.500`, ícone de check verde
- `invalid`: Borda `error.500`, mensagem vermelha: *"CNPJ inválido — verifique os dígitos"*
- `loading`: Borda `primary.400`, spinner azul pulsante

---

### 2. `<CompanyCard>` — Card de Empresa

**Hierarquia interna (top → bottom):**
1. Header: Logo placeholder + Nome da empresa + Status (ativa/inativa)
2. Score badge + Score visual (termômetro ou gauge)
3. Segmento (traduzido do CNAE)
4. Metadados: Fundação | Porte | Localização
5. Insight block (razão do score)
6. Ações: [Iniciar abordagem] [Ver detalhes] [Exportar]

**Variações:**
- `compact`: Apenas nome, score e segmento (visão de lista)
- `default`: Hierarquia completa acima
- `expanded`: Inclui dados técnicos e histórico

---

### 3. `<SegmentBadge>` — Badge de Segmento

Tradução visual do CNAE em linguagem de negócios.

**Anatomia:**
```
[Ícone do segmento] [Label do segmento]
```

**Exemplos de mapeamento:**
| CNAE | Badge |
|---|---|
| 6201-5/01 | 🖥 Software B2B |
| 6202-3/00 | ☁️ Cloud / Infra |
| 4751-2/01 | 🛒 E-commerce |
| 6311-9/00 | 📊 Dados / Analytics |
| 7020-4/00 | 🎯 Consultoria Estratégica |
| 6201-5/00 | 💻 Desenvolvimento de Software |

**Paleta de badges por categoria:**
- Tech / SaaS: Azul (`primary.100` / `primary.500`)
- Varejo / E-commerce: Verde (`success.100` / `success.500`)
- Serviços / Consultoria: Âmbar (`warning.100` / `warning.500`)
- Indústria / Manufatura: Cinza (`neutral.100` / `neutral.700`)

---

### 4. `<ScoreIndicator>` — Indicador de Score

O componente mais crítico do produto. Deve comunicar prioridade em menos de 1 segundo.

**Anatomia:**
```
[Número grande — ex: "87"]
[Label — "Alta chance de conversão"]
[Barra de progresso colorida]
[Sub-label — "Top 12% dos leads"]
```

**Regras visuais:**
- Score 80–100: Cor `score.hot`, ícone 🔥, label "Prioridade Alta"
- Score 50–79: Cor `score.warm`, ícone ⚡, label "Qualificar"
- Score 0–49: Cor `score.cold`, ícone ❄️, label "Baixa Prioridade"

**Animação**: Contador numérico ao carregar (0 → score final em 600ms, easing ease-out)

---

### 5. `<InsightBlock>` — Bloco de Insight Acionável

O componente que transforma dados em decisões.

**Anatomia:**
```
[Ícone contextual] [Título do insight]
[Descrição breve]
[Tag de confiança: Alta / Média / Estimada]
```

**Exemplos de insights:**
```
✅ "Empresa em expansão" 
   → Registrou 3 novos CNAEs nos últimos 12 meses

⚠️ "Possível recompra" 
   → Segmento compatível com seu ICP histórico

🎯 "Decisor acessível" 
   → Empresa de porte pequeno (10–49 funcionários)

❄️ "Ciclo longo provável" 
   → Empresa pública / licitação obrigatória
```

---

### 6. `<SkeletonLoader>` — Carregamento

Impede a sensação de "vazio". Deve replicar exatamente o layout do resultado.

**Regras:**
- Usar `surface.overlay` como base
- Animação de shimmer horizontal (gradiente deslizante)
- Duração do shimmer: `1.5s` em loop
- Exibir skeleton no mesmo layout do card resultado (não um spinner genérico)

**Elementos a simular:**
- Bloco de nome (linha larga)
- Bloco de score (quadrado grande)
- 3 linhas de metadado (larguras variadas)
- 2 insight blocks

---

### 7. Estados de Erro

#### CNPJ Inválido
```
Ícone: ⚠️ (amber)
Título: "CNPJ não encontrado"
Descrição: "Verifique se os 14 dígitos estão corretos ou tente outro CNPJ."
Ação: [Limpar e tentar novamente]
```

#### Falha de API
```
Ícone: 🔌 (red)
Título: "Não foi possível consultar agora"
Descrição: "O serviço de consulta está temporariamente indisponível. Tente novamente em instantes."
Ação: [Tentar novamente] [Reportar problema]
```

#### Empresa Inativa / Baixada
```
Ícone: 🚫 (neutral)
Título: "Empresa inativa"
Descrição: "Este CNPJ pertence a uma empresa encerrada ou com situação irregular na Receita Federal."
Badge: "INAPTA" (error.500)
```

---

## 🔄 Estados da Aplicação

| Estado | Trigger | Componente |
|---|---|---|
| `idle` | Carregamento inicial | Input vazio + placeholder instrucional |
| `typing` | Usuário digitando CNPJ | Input em foco, validação em tempo real |
| `loading` | CNPJ válido submetido | Skeleton loader + mensagem "Consultando empresa..." |
| `success` | Dados retornados | CompanyCard + ScoreIndicator + InsightBlocks |
| `empty` | CNPJ não encontrado | Estado de erro amigável |
| `error_api` | Falha de rede/API | Erro com retry |
| `error_invalid` | CNPJ inválido (formato) | Inline error no input |
| `error_inactive` | Empresa encerrada | Card com badge de status |

---

## ✍️ Linguagem e Microcopy

### Princípio
Falar como um colega de vendas experiente, não como um sistema de banco de dados.

### Traduções obrigatórias

| Dado bruto | Microcopy ✅ |
|---|---|
| `CNAE: 6201-5/01` | "Desenvolvimento de Software B2B" |
| `Natureza jurídica: 206-2` | "Empresa Privada (Ltda.)" |
| `capital_social: 50000` | "Pequeno porte — capital inicial de R$ 50k" |
| `data_inicio_atividade: 2019-03-15` | "5 anos de mercado" |
| `situacao: ATIVA` | Badge verde "ATIVA" |
| `situacao: BAIXADA` | Badge cinza "ENCERRADA" |
| `porte: MICRO` | "Microempresa (até 9 funcionários)" |
| `porte: PEQUENA` | "Pequeno porte (10–49 funcionários)" |
| `porte: MEDIO` | "Médio porte (50–249 funcionários)" |

### Tom de voz por contexto

**Insights positivos**: Direto, entusiasmado com cautela
> ✅ "Perfil alinhado ao seu ICP — vale priorizar"

**Insights neutros**: Informativo, sem drama
> 💡 "Empresa recente, menos de 2 anos — ciclo de decisão pode ser mais rápido"

**Insights negativos**: Claro, sem julgamento, orientado à ação
> ⚠️ "Empresa pública — processo de compra via licitação obrigatória"

**Estados de erro**: Nunca culpar o usuário
> ❌ Errado: "Dados inválidos"
> ✅ Certo: "Não encontramos esse CNPJ. Confira os números e tente de novo."

---

## 🎛 Níveis de Interface

### Modo Simples (SDR — Lucas)
**Princípio**: 3 informações, 1 decisão.

Exibe:
- Nome da empresa
- Score + temperatura (🔥 / 🌤 / ❄️)
- Segmento traduzido
- 1 insight principal
- 1 CTA: "Iniciar abordagem"

Oculta:
- Dados técnicos (CNPJ, CNAE, Natureza jurídica)
- Score detalhado
- Histórico

Ativado por: padrão para usuários sem permissão avançada

---

### Modo Analítico (Head de Vendas — Fernanda)
**Princípio**: Contexto + comparabilidade.

Exibe tudo do modo simples, mais:
- Score breakdown (quais fatores pesaram)
- Comparação com ICP médio da equipe
- Histórico de consultas de leads similares
- Tags de segmento e sub-segmento
- Dados de porte com benchmark

Ativado por: toggle "Visão Analítica" no header

---

### Modo Avançado (Growth — Rafael)
**Princípio**: Dados completos + API access.

Exibe tudo dos modos anteriores, mais:
- JSON raw da API de CNPJ
- Endpoint de consulta copiável
- Score algorithm weights
- Export: JSON / CSV / Webhook

Ativado por: toggle "Modo Developer" ou `?dev=true` na URL

---

## 📦 Tokens de Sombra

```css
shadow.sm:  0 1px 2px rgba(0,0,0,0.12)
shadow.md:  0 4px 12px rgba(0,0,0,0.15)
shadow.lg:  0 8px 32px rgba(0,0,0,0.20)
shadow.glow.hot:  0 0 20px rgba(245,82,26,0.25)
shadow.glow.warm: 0 0 20px rgba(245,166,35,0.20)
shadow.glow.primary: 0 0 20px rgba(47,111,237,0.25)
```

---

## 🔲 Border Radius

```
radius.xs:  4px   → Badges, chips
radius.sm:  6px   → Inputs, botões
radius.md:  10px  → Cards compactos
radius.lg:  16px  → Cards principais
radius.xl:  24px  → Modais, painéis
radius.full: 9999px → Score circle, avatars
```

---

## ⚡ Motion

### Princípios
- Movimentos rápidos (150–300ms) para feedback imediato
- Easing `ease-out` para elementos que entram (senso de chegada)
- Easing `ease-in` para elementos que saem

### Durações-padrão
```
instant:   0ms    → Mudanças de estado críticas (erro de validação)
fast:      150ms  → Hover, foco
normal:    250ms  → Transições de componente
slow:      400ms  → Entrada de cards, modais
score:     600ms  → Animação de contagem do score
skeleton:  1500ms → Shimmer loop
```

---

*Design System v1.0 — Lead Intelligence Platform*
*Gerado para teste técnico Letalk | Personas: Lucas (SDR) · Fernanda (Head) · Rafael (Growth)*

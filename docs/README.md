# LeadIntel — Enriquecimento de Leads B2B

Plataforma que transforma dados de CNPJ em insights comerciais acionáveis.

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

## Variáveis de ambiente

### Backend (`backend/.env`)

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3001/api
```

Crie os arquivos `.env` copiando os exemplos acima. Sem variáveis obrigatórias externas — a API da BrasilAPI é pública e não requer chave.

---

## Rodar localmente

```bash
# Na raiz do projeto (ambos simultaneamente)
npm run dev

# Ou separadamente:
npm run dev:backend   # http://localhost:3001
npm run dev:frontend  # http://localhost:5173
```

Acesse: **http://localhost:5173**

---

## Build para produção

```bash
npm run build
# Backend: backend/dist/
# Frontend: frontend/dist/
```

Para servir o frontend buildado, use qualquer servidor estático (nginx, Vercel, etc).  
O backend pode ser deployado em qualquer plataforma Node.js (Railway, Fly.io, Render).

---

## Uso de IA

Claude (Anthropic) foi utilizado para geração inicial da estrutura do projeto, com revisão e ajustes manuais em todas as decisões de arquitetura, padrões de design e lógica de negócio.

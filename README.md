# PipelineCRM

Uma interface moderna de CRM em Kanban, construída com React + Vite para gerenciar oportunidades de vendas.

![PipelineCRM](PIPELINECRM-1.png)

## Stack Tecnológica

| Responsabilidade | Biblioteca |
|-----------------|------------|
| Build & Dev | Vite + TypeScript |
| Estado do servidor | **TanStack Query v5** — cache, loading, error, invalidação |
| Estado global de UI | **Zustand** — filtros, modo de visualização, abertura/fechamento de modal |
| Formulários + validação | **React Hook Form** + **Zod** |
| Estilização | CSS puro com propriedades customizadas (sem Tailwind) |
| Cliente HTTP | Axios |
| Ícones | Lucide React |
| Testes | **Vitest** + **Testing Library** |

## Como Começar

> O frontend faz proxy de `/api` → `http://localhost:3000`. Inicie o backend primeiro.

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar a API (em outro terminal)
cd ../oportunidades-api && npm run start:dev

# 3. Iniciar o frontend
npm run dev          # http://localhost:5173
```

## Scripts Disponíveis

```bash
npm run dev           # servidor de desenvolvimento
npm run build         # build de produção
npm run test          # executar testes uma vez
npm run test:watch    # modo de observação
npm run test:coverage # relatório de cobertura
```

## Funcionalidades

- **Quadro Kanban** — quatro colunas (Aberta / Negociando / Ganha / Perdida) com totais por coluna
- **Visualização em Lista** — layout de tabela com linhas ordenáveis, alternável pela navbar
- **Sidebar** — valor total do pipeline, contagens e valores agregados por status, filtro por status com um clique
- **Busca por cliente** — campo de busca com debounce que filtra em todas as visualizações
- **Atualização de status inline** — clique no badge de qualquer card para alterar o status com um dropdown
- **Exclusão em duas etapas** — confirmação prévia evita exclusões acidentais
- **Modal de criação** — formulário validado (React Hook Form + Zod) com erros de campo em tempo real
- **Skeleton loaders** — placeholders animados em todos os estados de carregamento
- **Notificações toast** — feedback de sucesso/erro para cada mutação
- **Responsivo** — sidebar oculta no mobile, colunas do kanban com scroll horizontal

## Decisões de Arquitetura

**CSS puro em vez de Tailwind**
O Tailwind v4 + `@tailwindcss/vite` apresentou um problema de plugin neste ambiente que impedia a aplicação dos estilos. A solução foi migrar para propriedades customizadas CSS (variáveis), o que trouxe mais controle de design sem overhead de runtime.

**Zustand para estado de UI, TanStack Query para estado do servidor**
Essas duas responsabilidades são separadas intencionalmente. O Zustand gerencia o estado efêmero de UI (filtro ativo, modal aberto). O TanStack Query gerencia todos os dados do servidor com invalidação automática de cache após mutações — sem arrays manuais de `useState` para sincronizar.

**Zod + React Hook Form**
A validação orientada por schema significa que o schema Zod é a única fonte de verdade. Os tipos TypeScript são inferidos a partir dele (`z.infer`), mantendo o formulário, o payload da API e os tipos sempre em sincronia.

**Arquitetura CSS**
Todos os tokens de design vivem em variáveis CSS no `:root`. Os componentes referenciam variáveis, nunca valores fixos. Isso torna temas e modo escuro triviais. Os nomes de classes seguem uma convenção BEM-lite (`deal-card`, `deal-card-top`, `deal-value`).

## Estrutura do Projeto

```
src/
├── __tests__/           # Testes com Vitest + Testing Library
│   ├── CreateModal.test.tsx
│   ├── DealCard.test.tsx
│   ├── KanbanColumn.test.tsx
│   ├── Navbar.test.tsx
│   ├── StatusBadge.test.tsx
│   └── utils.test.ts
├── components/
│   ├── dashboard/       Sidebar (visão geral do pipeline + filtros)
│   ├── kanban/          KanbanBoard, KanbanColumn
│   ├── layout/          Navbar
│   ├── opportunities/   DealCard, ListView, CreateModal
│   └── ui/              StatusBadge, StatusSelect, Toast, Skeleton
├── hooks/               useOpportunities, useDashboard (TanStack Query)
├── lib/                 api.ts (Axios), schemas.ts (Zod), utils.ts
├── store/               ui.store.ts (Zustand)
├── test/                setup.ts, mocks.ts, renderWithProviders.tsx
└── types/               index.ts
```

## O que Melhoraria com Mais Tempo

- **Drag-and-drop** entre colunas do Kanban (`@dnd-kit/core` já está instalado)
- **Atualizações otimistas** — atualizar a UI imediatamente antes da resposta da API
- **Paginação / scroll infinito** na visualização em lista para grandes volumes de dados
- **Filtros por intervalo de datas** e slider de intervalo de valor na sidebar
- **Testes E2E** com Playwright cobrindo o fluxo completo de criar → atualizar → excluir
- **React Router / TanStack Router** para visualizações filtradas com deep-link (`/board?status=aberta`)
- **Storybook** para desenvolvimento isolado de componentes e regressão visual
- **Dashboard Gráfico** para melhor análise
- **Integração com IA** A IA analisa os dados do deal (valor, tempo em aberto, histórico de status

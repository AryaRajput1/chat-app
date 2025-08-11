# ChatApp: Turborepo Monorepo – React (Vite) + Node (Express) + Shared Types

This is a **Turborepo** setup using **pnpm workspaces** with:

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Shared Types**: TypeScript package shared between frontend & backend

---

## 📂 Project Structure

```
my-turbo-project/
│
├── apps/
│ ├── frontend/ # React + Vite app
│ └── backend/ # Node + Express app
│
├── packages/
│ └── types/ # Shared TypeScript types
│
├── turbo.json # Turborepo pipeline config
├── package.json # Root package.json with pnpm workspaces
└── tsconfig.json # Root TypeScript config
```

## 🚀 Getting Started

### 1️. Install Dependencies
```bash
pnpm install
```

### 2. Run local
```bash
pnpm dev
```

### 3. Build
```bash
pnpm build
```


## 🚀 Run Individual
```bash
pnpm --filter frontend dev    # Start frontend dev server
pnpm --filter frontend build  # Build frontend

pnpm --filter backend dev     # Start backend with ts-node
pnpm --filter backend build   # Build backend
```
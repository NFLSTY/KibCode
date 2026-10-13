# **Project Structure**

```bash
KibCode/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/
│   │   ├── components/
│   │   ├── public/
│   │   └── package.json
│   └── api/                    # Fastify backend
│       ├── src/
│       │   ├── routes/
│       │   └── server.ts
│       └── package.json
├── packages/
│   ├── database/               # Shared Prisma
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── types/                  # Shared API request/response DTOs
│   │   ├── src/
│   │   └── package.json
│   ├── utils/                  # Shared helpers, pure functions
│   │   ├── src/
│   │   └── package.json
│   ├── typescript-config/      # Shared TypeScript base configs
│   └── eslint-config/          # Shared ESLint configs
├── pnpm-workspace.yaml
├── turbo.json                  # Pipeline orchestration & cache
└── package.json                # Root scripts (turbo, pnpm)
```

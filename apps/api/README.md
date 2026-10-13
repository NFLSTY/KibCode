# **Backend (`@kibcode/api` — Fastify)**

```bash
apps/api/
├── src/
│   ├── index.ts                # Server entry point
│   ├── server.ts               # Fastify setup & plugin orchestration
│   ├── routes/
│   │   ├── health.ts           # GET /health
│   │   ├── auth.ts             # Auth endpoints (register, login)
│   │   ├── games.ts            # Game endpoints (list, get by id)
│   │   ├── students.ts         # Student endpoints (me, profile)
│   │   ├── progress.ts         # Progress & score tracking endpoints
│   │   └── index.ts            # Route aggregator
│   ├── controllers/
│   │   ├── gameController.ts
│   │   ├── studentController.ts
│   │   └── progressController.ts
│   ├── services/
│   │   ├── gameService.ts      # Business logic (queries @kibcode/database)
│   │   ├── studentService.ts
│   │   └── progressService.ts
│   ├── middleware/
│   │   ├── auth.ts             # JWT verification hook
│   │   ├── errorHandler.ts     # Global error handler
│   │   └── validation.ts       # Zod validation helpers
│   ├── plugins/
│   │   ├── db.ts               # Prisma plugin (imports from @kibcode/database)
│   │   ├── cors.ts             # Fastify CORS
│   │   └── jwt.ts              # Fastify JWT
│   ├── types/                  # Fastify type augmentations
│   │   └── index.ts
│   └── utils/
│       ├── logger.ts           # Pino logger configuration
│       └── validators.ts
├── tests/
│   └── routes.test.ts
├── .env.example
├── tsconfig.json               # Extends @kibcode/typescript-config/node.json
├── package.json
└── README.md
```
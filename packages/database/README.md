# **Database (Shared Prisma + Neon)**

```bash
packages/database/
├── prisma/
│   ├── schema.prisma           # Schema definition (Student, Game, GameProgress)
│   └── migrations/             # Migration files
├── src/
│   ├── index.ts                # Export Prisma client and types
│   ├── db.ts                   # Neon adapter and client initialization
│   └── seed.ts                 # Seed script (optional)
├── .env.example
├── tsconfig.json               # Extends @kibcode/typescript-config/base.json
├── package.json
└── README.md
```
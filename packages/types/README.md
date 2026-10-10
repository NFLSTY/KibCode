# **Types (`@edukids/types`)**

Shared TypeScript DTOs, request/response interfaces, and domain types used across the EduKids web and api applications.

```bash
packages/types/
├── src/
│   ├── index.ts                # Export all types
│   ├── api/
│   │   ├── game.ts             # Game DTOs & category types
│   │   ├── student.ts          # Student & Auth DTOs
│   │   └── progress.ts         # Progress & Score tracking DTOs
│   └── database/
│       └── index.ts            # Common entity types
├── tsconfig.json               # Extends @edukids/typescript-config/base.json
├── package.json
└── README.md
```
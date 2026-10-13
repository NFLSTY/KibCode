# **Types (`@kibcode/types`)**

Shared TypeScript DTOs, request/response interfaces, and domain types used across the KibCode web and api applications.

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
├── tsconfig.json               # Extends @kibcode/typescript-config/base.json
├── package.json
└── README.md
```
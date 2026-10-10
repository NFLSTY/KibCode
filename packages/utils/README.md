# **Utils (`@edukids/utils`)**

Shared helper functions, formatters, domain calculations, constants, and Zod schemas used across the EduKids monorepo.

```bash
packages/utils/
├── src/
│   ├── index.ts                # Main export
│   ├── validators.ts           # Zod validation schemas
│   ├── formatters.ts           # Duration, score, and string formatters
│   ├── calculations.ts         # Accuracy, star rating calculations
│   └── constants.ts            # Grade levels, categories, UI standards
├── tsconfig.json               # Extends @edukids/typescript-config/base.json
├── package.json
└── README.md
```
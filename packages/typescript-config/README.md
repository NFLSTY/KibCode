# **TypeScript Configuration (`@kibcode/typescript-config`)**

Shared TypeScript configurations across the KibCode monorepo to ensure consistent compilation targets, module resolutions, and strict type-checking standards.

```bash
packages/typescript-config/
├── base.json             # Core strict base compiler settings
├── nextjs.json           # Next.js App Router preset (used by apps/web)
├── node.json             # Node.js preset (used by apps/api & backend services)
├── react-library.json    # React component library preset
├── package.json
└── README.md
```

### Usage

Extend these configurations in individual app/package `tsconfig.json` files:

```json
{
  "extends": "@kibcode/typescript-config/base.json"
}
```
Or for Next.js / Node.js projects:
```json
{
  "extends": "@kibcode/typescript-config/nextjs.json"
}
```
```json
{
  "extends": "@kibcode/typescript-config/node.json"
}
```

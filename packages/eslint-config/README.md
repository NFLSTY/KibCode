# **ESLint Configuration (`@kibcode/eslint-config`)**

Internal shared ESLint rules and flat configurations across the KibCode monorepo to ensure consistent code styling, prevent common bugs, and integrate smoothly with Next.js and React.

```bash
packages/eslint-config/
├── base.js               # Common JavaScript / TypeScript lint rules
├── next.js               # Next.js & React Core Web Vitals linting rules
├── react-internal.js     # Internal React component linting rules
├── package.json
└── README.md
```

### Usage

Import into your project's `eslint.config.mjs`:

```javascript
import { config } from "@kibcode/eslint-config/base";

export default [...config];
```
Or for Next.js applications:
```javascript
import { nextJsConfig } from "@kibcode/eslint-config/next-js";

export default [...nextJsConfig];
```

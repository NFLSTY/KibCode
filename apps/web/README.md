# **Frontend (`@edukids/web` — Next.js 14+)**

```bash
apps/web/
├── app/                        # App Router
│   ├── layout.tsx              # Root layout (Fredoka & Nunito typography, theme)
│   ├── page.tsx                # Landing page
│   ├── games/
│   │   ├── page.tsx            # Game catalog & lobby
│   │   ├── [gameId]/
│   │   │   └── page.tsx        # Interactive quiz arena
│   │   └── layout.tsx
│   ├── dashboard/
│   │   └── page.tsx            # Student progress dashboard
│   ├── login/
│   │   └── page.tsx            # Student login screen
│   └── register/
│       └── page.tsx            # Student registration screen
├── components/
│   ├── ui/                     # Tactile 3D kid-friendly UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Badge.tsx
│   ├── landing/                # Landing sections
│   ├── games/                  # Quiz arena & catalog cards
│   └── dashboard/              # Student stats & radial meter
├── lib/
│   ├── api-client.ts           # Type-safe API client (calls Fastify backend)
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useGame.ts
│   │   └── useProgress.ts
│   └── utils.ts
├── public/
├── .env.example
├── next.config.ts
├── tsconfig.json               # Extends @edukids/typescript-config/nextjs.json
├── package.json
└── README.md
```
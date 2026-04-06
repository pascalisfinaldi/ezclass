# EZClass Placement Test App

This project is a Next.js app that simulates an English placement test flow:
- Submit answers
- Poll for evaluation result
- Show completed or failed result state

## Personal Step-by-Step Setup

Follow these exact steps from a fresh machine.

### 1. Prerequisites

Install:
- Node.js 20+
- npm 10+

Check versions:

```bash
node -v
npm -v
```

### 2. Install dependencies

From the project root:

```bash
npm install
```

### 3. Configure environment variables

Create your local env file:

```bash
cp .env.example .env.local
```

Set values in .env.local:

```env
NEXT_PUBLIC_API_BASE_URL=
```

Notes:
- Keep it empty for same-origin requests in local development.
- Use a full URL (for example https://api.example.com) when the frontend calls a different API host.

### 4. Run the app

```bash
npm run dev
```

Open:
- http://localhost:3000

### 5. Verify the flow works

1. Start the placement test and answer the questions.
2. Submit the answers.
3. Confirm you see the processing state.
4. Wait until the result becomes completed or failed.
5. Use retry/refetch and confirm processing appears again while polling restarts.

### 6. Common commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure (High Level)

- src/app: pages and API routes
- src/components: UI and placement components
- src/hooks: data fetching hooks for questions and results
- src/services: API client helpers
- src/types: shared TypeScript types

## Troubleshooting

### Port 3000 already in use

Run on a different port:

```bash
npm run dev -- -p 3001
```

### Env change not applied

Stop and restart the dev server after changing .env.local.

### API calls failing

Check NEXT_PUBLIC_API_BASE_URL in .env.local and verify the target API is reachable.

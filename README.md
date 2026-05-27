<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/brain-circuit.svg" width="80" height="80" alt="MessageDNA Logo"/>
  <h1>MessageDNA</h1>
  <p><strong>The Open-Source Conversion Intelligence Platform</strong></p>
  <p>AI-powered behavioral analysis and persuasion scoring for modern growth teams.</p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript" alt="TypeScript" /></a>
    <a href="https://supabase.com"><img src="https://img.shields.io/badge/Supabase-DB-3ECF8E?style=flat&logo=supabase" alt="Supabase" /></a>
    <a href="https://sdk.vercel.ai/docs"><img src="https://img.shields.io/badge/AI_SDK-Vercel-black?style=flat&logo=vercel" alt="Vercel AI SDK" /></a>
    <a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/UI-shadcn-black?style=flat" alt="shadcn/ui" /></a>
    <a href="https://github.com/yourusername/messagedna/actions"><img src="https://img.shields.io/github/actions/workflow/status/yourusername/messagedna/ci.yml?branch=main" alt="CI Status" /></a>
  </p>

  <p>
    <a href="#product-overview">Overview</a> •
    <a href="#key-features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture-overview">Architecture</a> •
    <a href="#installation-guide">Install</a> •
    <a href="#roadmap">Roadmap</a>
  </p>
</div>

<br />

## Product Overview

MessageDNA is a production-grade **Conversion Intelligence Platform** designed to replace generic "AI copywriting" wrappers. It brings the precision of behavioral psychology, persuasion science, and psycholinguistics to marketing copy analysis.

Rather than simply generating text, MessageDNA deconstructs your messaging down to its core psychological components. It evaluates landing pages, emails, ads, and CTAs across proprietary metrics like the **Cognitive Friction Index** and **Trust Deficit Score**, providing actionable insights and optimized rewrites tailored to specific emotional triggers.

**Built for:**
- **Founders & Indie Hackers:** Validate value propositions and eliminate landing page friction.
- **Growth Marketers:** Optimize ad spend by running data-driven copy experiments.
- **Agencies:** Generate compelling, objective analysis reports for client pitches.
- **Copywriters:** Augment creative instincts with structured psychological frameworks.

---

## Key Features

### 🧠 Multi-Agent AI System
A sophisticated orchestration of 13 independent AI agents, each specialized in a distinct psychological domain:
- *Clarity Analysis*, *Emotional Resonance*, *Trust & Authority*, *Cognitive Bias Detection*, *Buyer Intent Alignment*, and more.
- Each agent operates concurrently, yielding deterministic, structured JSON outputs with confidence scores.

### 📊 Behavioral Intelligence Scoring
We reject arbitrary "AI scores out of 100." MessageDNA utilizes proprietary, scientifically-grounded metrics:
- **Cognitive Friction Index:** Measures the mental load required to understand the core offer.
- **Trust Deficit Score:** Identifies missing trust signals, skeptical claims, and vague guarantees.
- **Emotional Activation Level:** Quantifies language that triggers urgency, relief, or aspiration.
- **CTA Persuasion Strength:** Evaluates the friction, contrast, and risk-reversal mechanics of conversion points.

### 🔄 AI Rewrite Engine
Generate variations optimized for specific psychological outcomes, not just "make it sound better."
- *High-Trust Rewrites*, *Urgency Variants*, *Minimalist/Clarity Rewrites*, and *Objection-Handling Variants*.

### 🌐 Intelligent URL Ingestion
Paste a URL, and our purpose-built scraping engine extracts headlines, CTAs, and semantic sections while ignoring DOM noise (navbars, footers, cookie banners) to analyze the actual conversion funnel.

### 🏢 Team & Enterprise Ready
- Role-based access control (RBAC), team workspaces, shared audit logs, and version history.
- Shareable, beautifully formatted public reports and PDF exports.

---

## Product Showcase

*(Screenshots placeholder - Replace with actual application images)*

| Intelligence Dashboard | Analysis Results |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/18181b/ffffff?text=Intelligence+Dashboard" alt="Dashboard" /> | <img src="https://via.placeholder.com/600x400/18181b/ffffff?text=Behavioral+Metrics" alt="Metrics" /> |
| **Rewrite Engine** | **Competitor Analysis** |
| <img src="https://via.placeholder.com/600x400/18181b/ffffff?text=AI+Rewrite+Engine" alt="Rewrites" /> | <img src="https://via.placeholder.com/600x400/18181b/ffffff?text=Competitor+Comparison" alt="Competitors" /> |

---

## Tech Stack

MessageDNA is built on a modern, highly scalable stack optimized for developer velocity and enterprise reliability.

### Core Architecture
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Styling & UI:** Tailwind CSS v4, `shadcn/ui`, Framer Motion, Radix UI Primitives
- **Backend:** Next.js API Routes (Edge & Serverless)
- **Database:** Supabase (PostgreSQL) with Row-Level Security (RLS)

### AI Infrastructure
- **Orchestration:** Vercel AI SDK (`ai` and `@ai-sdk/openai`)
- **Models:** OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet) via multi-provider fallback
- **Validation:** Zod (Strict JSON Schema structured outputs)

### Operations & Infrastructure
- **Payments:** Stripe (Subscriptions & Usage-based billing)
- **Monitoring:** Sentry (Error tracking), PostHog (Product analytics)
- **Testing:** Vitest (Unit), Playwright (E2E)
- **Deployment:** Vercel (Frontend & Serverless APIs), GitHub Actions (CI/CD)

---

## Architecture Overview

MessageDNA utilizes a **Modular Service Architecture**.

```mermaid
graph TD
    Client[Next.js Client (React Server Components)]
    API[Next.js API Routes]
    DB[(Supabase PostgreSQL)]
    AI[Vercel AI SDK Orchestrator]
    Agents[Multi-Agent Pool]
    Scraper[URL Ingestion Engine]

    Client <-->|tRPC / Server Actions| API
    API <-->|Prisma / Supabase JS| DB
    API -->|Ingest| Scraper
    API <-->|Streaming / Structured JSON| AI
    AI -->|Parallel Prompts| Agents
    Agents -->|OpenAI / Anthropic| LLM[LLM APIs]
```

### Key Architectural Decisions:
1. **Multi-Agent Orchestration:** Instead of a massive monolithic prompt, the analysis pipeline fans out requests to smaller, specialized agents. This reduces hallucination, improves speed (via parallel execution), and allows granular confidence scoring.
2. **Structured Outputs:** All LLM responses are enforced via `generateObject` and Zod schemas, guaranteeing the frontend receives strictly typed data arrays, preventing parsing errors.
3. **Streaming UI:** Analysis can take 5-10 seconds. We utilize the Vercel AI SDK's streaming capabilities to progressively render insights, maintaining a low Perceived Time To First Byte (TTFB).

---

## Folder Structure

```text
messagedna/
├── .github/                # CI/CD workflows
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router (Pages, Layouts, API Routes)
│   │   ├── (auth)/         # Authentication routes
│   │   ├── api/            # Serverless & Edge API endpoints
│   │   └── dashboard/      # Main application interface
│   ├── components/         # React components
│   │   ├── dashboard/      # Domain-specific components
│   │   └── ui/             # shadcn/ui generic components
│   ├── core/               # Business logic & AI Orchestration
│   │   ├── agents/         # Individual AI agent prompts & schemas
│   │   ├── scraper/        # URL ingestion logic
│   │   └── scoring/        # Algorithmic scoring calculators
│   ├── lib/                # Utilities (Supabase client, Stripe, utilities)
│   └── tests/              # Vitest & Playwright test suites
├── supabase/               # Database migrations & seed data
├── .env.example            # Environment variables template
├── components.json         # shadcn configuration
└── package.json
```

---

## Installation Guide

### Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0
- Docker (optional, for local Supabase)
- Stripe Account (for billing)
- OpenAI API Key

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/messagedna.git
cd messagedna
npm install
```

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

### 3. Supabase Setup
We use Supabase for auth and database. You can run it locally via CLI:
```bash
npx supabase start
npx supabase db push
```

### 4. Run the Development Server
```bash
npm run development
```
Navigate to `http://localhost:3000`.

---

## Environment Variables

Your `.env.local` should look like this:

```env
# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# AI Providers
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Observability
NEXT_PUBLIC_POSTHOG_KEY="..."
```

---

## Database Schema Overview

MessageDNA uses a relational model optimized for multi-tenant SaaS architecture.

- **`users`**: Extended profile data, preferences, and API token allowances.
- **`workspaces`**: Tenancy root. Handles team billing, RBAC, and shared resources.
- **`analyses`**: Core record of an ingestion event (URL or raw text).
- **`ai_outputs`**: The structured JSON results from the multi-agent system, mapped to an analysis.
- **`subscriptions`**: Stripe state synchronization.
- **`reports`**: Snapshot references for public sharing.
- **`usage_tracking`**: Logs API tokens and analysis counts for billing.

*All tables are protected by strict PostgreSQL Row-Level Security (RLS) policies.*

---

## AI Pipeline Explanation

When a user submits copy, the system initiates a highly deterministic pipeline:

1. **Ingestion & Sanitization:** If a URL is provided, the Edge Scraper extracts DOM, strips boilerplate, and isolates core semantic elements (Hero, Features, CTA).
2. **Agent Fan-Out:** The orchestrator dispatches the sanitized text to 13 distinct agents concurrently.
3. **Structured Generation:** Agents use `<generateObject>` to force the LLM to reply with a strict JSON schema.
4. **Scoring Aggregation:** The `scoring/` module aggregates the raw JSON metrics, weighting critical failures (e.g., severe Trust Deficit) heavier than warnings.
5. **Rewrite Generation:** A secondary prompt chain triggers, utilizing the specific friction points identified in step 4 to generate highly targeted rewrites.

---

## Security Practices

- **Authentication:** Supabase Auth (JWTs) securely managed via HTTP-only cookies in Next.js Middleware.
- **Row-Level Security (RLS):** Database queries are bounded at the Postgres level. A user can *never* query another workspace's data, regardless of API flaws.
- **Rate Limiting:** Upstash Redis handles strict tier-based rate limiting to prevent abuse of expensive LLM endpoints.
- **AI Guardrails:** Prompts are sandboxed. Malicious prompt injection is mitigated by treating user input strictly as data payload, not instruction.
- **Webhook Verification:** All Stripe webhooks are cryptographically verified before processing.
- **OWASP Best Practices:** Implementation of robust CSP headers and strict input validation via Zod.

---

## Performance Optimizations

- **Streaming UI:** We stream AI responses chunk-by-chunk using `React Server Components` and `Suspense` boundaries to eliminate loading spinners for heavy tasks.
- **Edge Rendering:** API routes requiring low latency (like initial data fetching) are deployed to the Vercel Edge Network.
- **Caching:** Expensive semantic analyses are fingerprinted via SHA-256 and cached in Redis. Identical copy submissions resolve instantly.
- **Lazy Loading:** Heavy components and analysis visualizations are dynamically imported.
- **Bundle Optimization:** Adherence to Next.js strict bundle optimization practices targeting < 100kb initial JS loads.

---

## Testing Pipeline

We maintain a rigorous standard to ensure enterprise-grade reliability.

```bash
# Run unit & integration tests
npm run test

# Run End-to-End tests
npx playwright test
```

- **Vitest:** Handles core algorithmic testing (scoring logic, scraper parsing, token counting).
- **Playwright:** Validates critical user flows (Authentication, Stripe Checkout, Analysis Submission, Report Generation).
- **Accessibility:** Automated a11y testing integrated into the pipeline to maintain WCAG compliance.

---

## CI/CD Workflow

1. **Push to Branch:** Triggers GitHub Actions. Runs ESLint, Prettier, TypeScript compilation, and Vitest suites.
2. **Pull Request:** Vercel automatically deploys a Preview Environment and runs Playwright E2E tests against it.
3. **Merge to Main:** Triggers a production build on Vercel. Database migrations are applied via Supabase CLI in the GitHub Action.

---

## Roadmap

- [x] Multi-Agent Analysis Engine Prototype
- [x] Dashboard UI & Proprietary Metric Visualization
- [ ] **Phase 1:** Stripe Billing Integration & Usage Tracking
- [ ] **Phase 2:** Team Workspaces & RBAC
- [ ] **Phase 3:** Chrome Browser Extension (Analyze live pages)
- [ ] **Phase 4:** A/B Testing Infrastructure Integration
- [ ] **Phase 5:** Predictive Conversion Scoring & Heatmaps
- [ ] **Phase 6:** Multilingual Support
- [ ] **Phase 7:** Public Developer API & Enterprise Features

---

## Contribution Guidelines

We welcome contributions from the community!

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes using Conventional Commits (`git commit -m 'feat: add amazing feature'`).
4. Ensure all tests pass (`npm run test`).
5. Open a Pull Request against the `main` branch.

Please review our `CONTRIBUTING.md` for detailed coding standards.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Acknowledgements

- Built with [Next.js](https://nextjs.org/)
- Components by [shadcn/ui](https://ui.shadcn.com/)
- Database by [Supabase](https://supabase.com/)
- Orchestration by [Vercel AI SDK](https://sdk.vercel.ai/docs)

---

<div align="center">
  <p>Built with precision by the MessageDNA Engineering Team.</p>
  <p>
    <a href="#">Website</a> •
    <a href="#">Documentation</a> •
    <a href="#">Twitter</a>
  </p>
</div>

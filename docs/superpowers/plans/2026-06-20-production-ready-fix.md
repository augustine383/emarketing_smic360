# Production-Ready Fix Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all TypeScript/build errors, remove `ignoreBuildErrors`, and make the project build-clean for Vercel deployment.

**Architecture:** Client-side Next.js 15 SPA with App Router. All state in localStorage. PIN-based auth. 11 email template types with field-based editing and Gmail HTML export.

**Tech Stack:** Next.js 15.5.9, React 19, TypeScript 5, Tailwind CSS 3, shadcn/ui, Radix UI, Lucide icons

---

### Current Error Summary

| File | Error | Cause |
|------|-------|-------|
| `src/ai/genkit.ts` | TS2307: Cannot find module 'genkit' | Package not installed |
| `src/ai/genkit.ts` | TS2307: Cannot find module '@genkit-ai/google-genai' | Package not installed |
| `src/ai/flows/generate-email-template-flow.ts` | TS2307 + TS7006 | Missing module + untyped param |
| `src/ai/flows/refine-email-template-flow.ts` | TS2307 + TS7006 | Missing module + untyped param |
| `src/components/ui/calendar.tsx` | TS2353: 'IconLeft' not in CustomComponents | react-day-picker v9 API changed |
| `src/components/ui/calendar.tsx` | TS7031: implicit 'any' on className | Same v9 breaking change |

---

### Task 1: Fix calendar.tsx (react-day-picker v9 breaking change)

**Files:**
- Modify: `src/components/ui/calendar.tsx:56-63`

**Problem:** `react-day-picker` v9 renamed `IconLeft`/`IconRight` to `Chevron` and changed the component signature. The current shadcn/ui calendar component uses the old API.

- [ ] **Step 1: Replace the components block in calendar.tsx**

Replace lines 56-63 (the `components={{...}}` block) with:

```tsx
      components={{
        Chevron: ({ orientation, className, ...props }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className={cn("h-4 w-4", className)} {...props} />;
        },
      }}
```

- [ ] **Step 2: Verify the fix compiles**

Run: `npx tsc --noEmit --skipLibCheck 2>&1 | Select-String "calendar"`
Expected: No output (no calendar errors)

---

### Task 2: Fix AI/Genkit module errors

**Files:**
- Modify: `src/ai/genkit.ts`
- Modify: `src/ai/flows/generate-email-template-flow.ts`
- Modify: `src/ai/flows/refine-email-template-flow.ts`

**Problem:** The `genkit` and `@genkit-ai/google-genai` packages are not installed. These AI flows are scaffolded but unused in the UI. Two options:

**Chosen approach:** Install the missing packages so TypeScript resolves them. The flows remain unused but compile cleanly.

- [ ] **Step 1: Install genkit packages**

Run: `npm install genkit @genkit-ai/google-genai`

- [ ] **Step 2: Fix the untyped `input` parameter in generate flow**

In `src/ai/flows/generate-email-template-flow.ts:46`, the `input` parameter has implicit `any`. The flow's `inputSchema` is a `z.string()`, but Genkit's `defineFlow` expects the callback param to match. The fix is to add an explicit type:

```typescript
async (input: string) => {
```

- [ ] **Step 3: Fix the untyped `input` parameter in refine flow**

In `src/ai/flows/refine-email-template-flow.ts:49`, same issue:

```typescript
async (input: RefineEmailTemplateInput) => {
```

- [ ] **Step 4: Verify AI files compile**

Run: `npx tsc --noEmit --skipLibCheck 2>&1 | Select-String "ai/"`
Expected: No output

---

### Task 3: Remove ignoreBuildErrors from next.config.ts

**Files:**
- Modify: `next.config.ts:5-10`

**Problem:** `ignoreBuildErrors: true` masks TypeScript and ESLint errors during `next build`. This must be removed for production.

- [ ] **Step 1: Remove the TypeScript and ESLint ignore blocks**

Replace the config with:

```typescript
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Run full typecheck**

Run: `npx tsc --noEmit --skipLibCheck`
Expected: Exit code 0, no errors

- [ ] **Step 3: Run production build**

Run: `npx next build`
Expected: Build succeeds with no TypeScript or ESLint errors

---

### Task 4: Clean up duplicate files and unused dependencies

**Files:**
- Delete: `src/app/lib/placeholder-images.json` (duplicate)
- Modify: `package.json`

**Problem:** `src/app/lib/placeholder-images.json` is a duplicate of `src/lib/placeholder-images.json`. Only the `src/lib/` version is imported by code. Also, several npm packages are installed but never imported in any source file.

- [ ] **Step 1: Delete the duplicate placeholder-images.json**

Run: `Remove-Item "src\app\lib\placeholder-images.json" -Force`

- [ ] **Step 2: Remove unused packages from package.json**

Remove these dependencies that are never imported in any source file under `src/`:
- `@hookform/resolvers`
- `@radix-ui/react-accordion`
- `@radix-ui/react-avatar`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-collapsible`
- `@radix-ui/react-dialog`
- `@radix-ui/react-menubar`
- `@radix-ui/react-popover`
- `@radix-ui/react-progress`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-scroll-area`
- `@radix-ui/react-separator`
- `@radix-ui/react-slider`
- `@radix-ui/react-switch`
- `@radix-ui/react-tooltip`
- `date-fns`
- `dotenv`
- `embla-carousel-react`
- `firebase`
- `patch-package`
- `react-day-picker`
- `react-hook-form`
- `recharts`

Run: `npm uninstall @hookform/resolvers @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-menubar @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tooltip date-fns dotenv embla-carousel-react firebase patch-package react-day-picker react-hook-form recharts`

**Wait** — `react-day-picker` is imported by `calendar.tsx`. Keep it. Also keep `firebase` if `apphosting.yaml` references it.

Revised uninstall (removing firebase and react-day-picker from the list):

Run: `npm uninstall @hookform/resolvers @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-menubar @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tooltip date-fns dotenv embla-carousel-react patch-package react-hook-form recharts`

- [ ] **Step 3: Verify build still passes**

Run: `npx next build`
Expected: Build succeeds

---

### Task 5: Add ESLint configuration

**Files:**
- Create: `eslint.config.mjs`

**Problem:** No ESLint config exists. Next.js 15 recommends the flat config format.

- [ ] **Step 1: Create eslint.config.mjs**

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

- [ ] **Step 2: Install ESLint dependencies**

Run: `npm install -D @eslint/eslintrc`

- [ ] **Step 3: Run lint**

Run: `npx next lint`
Expected: Lint runs, reports any warnings (not fatal)

---

### Task 6: Create .env.example for Vercel

**Files:**
- Create: `.env.example`

**Problem:** No environment variable documentation exists. Vercel needs to know what env vars are required.

- [ ] **Step 1: Create .env.example**

```
# AI Features (optional — Genkit + Gemini)
GOOGLE_GENAI_API_KEY=

# App Config
NEXT_PUBLIC_APP_URL=
```

- [ ] **Step 2: Create .gitignore entry if missing**

Ensure `.env` is in `.gitignore` (it should already be via the Firebase template).

---

### Task 7: Verify Vercel build

**Files:** None (verification only)

- [ ] **Step 1: Run the full production build**

Run: `npx next build`
Expected: Build completes with 0 errors

- [ ] **Step 2: Check for any remaining warnings**

Run: `npx next build 2>&1 | Select-String "Error|Warning|error|warning"`
Expected: No error lines

- [ ] **Step 3: Verify the build output**

The `.next` directory should contain the production build. Confirm it exists:
Run: `Test-Path ".next\BUILD_ID"`
Expected: True

---

## Execution Summary

| Task | What | Files Changed |
|------|------|---------------|
| 1 | Fix calendar.tsx (react-day-picker v9) | 1 modified |
| 2 | Install genkit + fix AI flow types | 3 modified, 2 packages added |
| 3 | Remove ignoreBuildErrors | 1 modified |
| 4 | Clean duplicates + unused deps | 1 deleted, package.json modified, ~20 packages removed |
| 5 | Add ESLint config | 1 created, 1 dev dep added |
| 6 | Create .env.example | 1 created |
| 7 | Verify Vercel build | 0 (verification only) |

**Total:** ~8 files changed, ~20 packages removed, 2 packages added, 2 files created.

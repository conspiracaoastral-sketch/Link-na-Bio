# Arquivo Crente Netlify Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the AI Studio Express deployment into a Netlify static site plus a secure Netlify Function while preserving the existing frontend and YouTube behavior.

**Architecture:** Vite builds the React frontend to `dist`. A focused Netlify Function serves the existing `/api/youtube` contract through a rewrite, reads `YOUTUBE_API_KEY` at runtime, and caches successful responses at the Netlify CDN.

**Tech Stack:** React 19, Vite 6, TypeScript 5.8, Netlify Functions Web API, Node 22 built-in test runner.

## Global Constraints

- Preserve the current visual design and all existing product, community, support, and image URLs.
- Keep `YOUTUBE_API_KEY` out of source control and browser bundles.
- Preserve the existing `YouTubeApiResponse` JSON shape consumed by `src/App.tsx`.
- Keep static frontend fallbacks working when the API is unavailable.
- Build with `npm run build` and publish `dist`.

---

### Task 1: YouTube Core Module

**Files:**
- Create: `netlify/functions/youtube-core.ts`
- Create: `tests/youtube-core.test.ts`

**Interfaces:**
- Produces: `parseISO8601Duration(duration: string): string`
- Produces: `formatSubscribers(count: string): string`
- Produces: `formatVideos(count: string): string`
- Produces: `fetchYouTubeData(apiKey: string, fetchImpl?: typeof fetch): Promise<YouTubeApiResponse>`

- [ ] **Step 1: Write failing tests for subscriber formatting and duration parsing**
- [ ] **Step 2: Run tests and verify module-not-found failure**
- [ ] **Step 3: Implement the pure formatting helpers**
- [ ] **Step 4: Run tests and verify helper tests pass**
- [ ] **Step 5: Write a failing fake-fetch test for channel and latest-video shaping**
- [ ] **Step 6: Implement `fetchYouTubeData` with the fixed channel ID `UCRvl92NpytYWQ9JAfPmCeQA`**
- [ ] **Step 7: Run the complete core test file**
- [ ] **Step 8: Commit the core module and tests**

### Task 2: Netlify HTTP Function

**Files:**
- Create: `netlify/functions/youtube.ts`
- Create: `tests/youtube-function.test.ts`

**Interfaces:**
- Consumes: `fetchYouTubeData` from `youtube-core.ts`
- Produces: default Netlify handler `(request: Request) => Promise<Response>`

- [ ] **Step 1: Write failing tests for missing API key and non-GET requests**
- [ ] **Step 2: Run tests and verify module-not-found failure**
- [ ] **Step 3: Implement the minimal handler**
- [ ] **Step 4: Add success-only cache headers: `Netlify-CDN-Cache-Control: public, durable, max-age=900, stale-while-revalidate=300`**
- [ ] **Step 5: Run function tests and verify all pass**
- [ ] **Step 6: Commit the function and tests**

### Task 3: Netlify Build Configuration

**Files:**
- Create: `netlify.toml`
- Modify: `package.json`
- Modify: `.env.example`
- Delete: `server.ts`
- Delete: `bun.lock`

**Interfaces:**
- Produces: Netlify build output in `dist/`
- Produces: `/api/youtube` rewrite to `/.netlify/functions/youtube`

- [ ] **Step 1: Add `netlify.toml` with build, function, API rewrite, and SPA fallback settings**
- [ ] **Step 2: Simplify `package.json` scripts to Vite build/preview, TypeScript lint, and Node tests**
- [ ] **Step 3: Remove Express-only dependencies and the obsolete long-running server**
- [ ] **Step 4: Update `.env.example` to document only `YOUTUBE_API_KEY`**
- [ ] **Step 5: Run configuration assertions that verify rewrite ordering and publish directory**
- [ ] **Step 6: Commit deployment configuration**

### Task 4: Documentation and Verification

**Files:**
- Modify: `README.md`
- Create: `NETLIFY-PUBLICACAO.md`

**Interfaces:**
- Produces: user-facing setup steps for GitHub, Netlify, environment variable, test URL, and custom domain.

- [ ] **Step 1: Document local commands and Netlify deployment settings**
- [ ] **Step 2: Document how to add `YOUTUBE_API_KEY` without committing its value**
- [ ] **Step 3: Run `npm test`**
- [ ] **Step 4: Run `npm run lint`**
- [ ] **Step 5: Run `npm run build`**
- [ ] **Step 6: Inspect the final archive and verify no `.env` or API key value is included**
- [ ] **Step 7: Commit documentation and final verification changes**

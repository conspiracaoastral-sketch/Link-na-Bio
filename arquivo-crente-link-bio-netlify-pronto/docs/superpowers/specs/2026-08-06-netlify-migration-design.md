# Arquivo Crente Netlify Migration Design

## Goal

Publish the existing Arquivo Crente Link na Bio React/Vite application on Netlify without changing its visual design, while preserving the secure YouTube integration and making future GitHub-based deployments automatic.

## Current State

- React 19 + Vite frontend.
- Frontend requests `/api/youtube`.
- A long-running Express server in `server.ts` serves the app and implements `/api/youtube`.
- `YOUTUBE_API_KEY` is read from the server environment.
- Product, WhatsApp, Drive, Pix, and avatar images use public Google Drive URLs in the current UI.
- The AI Studio deployment remains available as a rollback option.

## Chosen Architecture

- Build the frontend as a static Vite site into `dist/`.
- Replace the Express route with a Netlify Function at `netlify/functions/youtube.ts`.
- Keep the browser-facing endpoint `/api/youtube` through a Netlify rewrite to `/.netlify/functions/youtube`.
- Keep `YOUTUBE_API_KEY` exclusively in Netlify environment variables.
- Cache successful YouTube responses at Netlify's CDN for 15 minutes, with stale-while-revalidate for resilience.
- Keep frontend fallbacks unchanged so the site remains usable if the API key is absent or YouTube fails.

## Components

### `netlify/functions/youtube-core.ts`

Owns YouTube-specific formatting and data retrieval:

- subscriber and video count formatting;
- ISO 8601 duration parsing;
- channel lookup;
- uploads playlist lookup;
- latest public video lookup;
- response shaping.

The fetch implementation is injectable for deterministic tests.

### `netlify/functions/youtube.ts`

Owns HTTP behavior:

- accepts `GET` requests;
- reads `process.env.YOUTUBE_API_KEY`;
- returns JSON in the existing `YouTubeApiResponse` shape;
- returns graceful `success: false` fallback responses instead of throwing to the frontend;
- sets Netlify CDN cache headers only on successful API responses.

### `netlify.toml`

Defines:

- build command: `npm run build`;
- publish directory: `dist`;
- functions directory: `netlify/functions`;
- API rewrite before the SPA fallback;
- SPA fallback to `index.html`.

## Data Flow

1. Browser loads the static React app from Netlify.
2. `src/App.tsx` requests `/api/youtube`.
3. Netlify rewrites the request to the `youtube` function.
4. The function reads `YOUTUBE_API_KEY` from Netlify.
5. The function queries the YouTube Data API for channel statistics and latest upload metadata.
6. The function returns the existing JSON shape.
7. The frontend updates metrics and latest video, or keeps static fallback content if `success` is false.

## Error Handling

- Missing API key: HTTP 200 with `{ success: false, error: ... }`; browser keeps fallbacks.
- YouTube API non-2xx response: HTTP 200 with `{ success: false, error: ... }`; browser keeps fallbacks.
- Missing channel or malformed response: graceful failure response.
- Unsupported HTTP method: HTTP 405 with `Allow: GET`.
- Successful responses are CDN-cached; error responses are not cached.

## Testing

- Node built-in test runner with Node's TypeScript stripping.
- Pure tests for formatting and duration parsing.
- Deterministic integration-style test for YouTube response construction using an injected fake `fetch`.
- Function tests for missing key and unsupported methods.
- TypeScript lint and Vite production build.

## Deployment

1. Push the adapted project to GitHub.
2. Import the repository in Netlify.
3. Add `YOUTUBE_API_KEY` in Netlify environment variables.
4. Trigger a production deploy.
5. Test the temporary `.netlify.app` URL.
6. Connect a custom domain only after the temporary URL passes verification.

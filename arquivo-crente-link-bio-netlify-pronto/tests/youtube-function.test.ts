import assert from 'node:assert/strict';
import test from 'node:test';
import handler from '../netlify/functions/youtube.ts';

test('returns a graceful JSON fallback when YOUTUBE_API_KEY is missing', async () => {
  const previous = process.env.YOUTUBE_API_KEY;
  delete process.env.YOUTUBE_API_KEY;

  try {
    const response = await handler(new Request('https://example.netlify.app/api/youtube'));
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.equal(payload.success, false);
    assert.match(payload.error, /not configured/);
    assert.equal(response.headers.get('netlify-cdn-cache-control'), null);
  } finally {
    if (previous === undefined) delete process.env.YOUTUBE_API_KEY;
    else process.env.YOUTUBE_API_KEY = previous;
  }
});

test('rejects unsupported methods without invoking YouTube', async () => {
  const response = await handler(
    new Request('https://example.netlify.app/api/youtube', { method: 'POST' }),
  );
  const payload = await response.json();

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET');
  assert.equal(payload.success, false);
});


test('adds Netlify CDN caching headers to successful responses', async () => {
  const previousKey = process.env.YOUTUBE_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.YOUTUBE_API_KEY = 'secret-key';

  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.includes('/channels?')) {
      return Response.json({
        items: [
          {
            statistics: { subscriberCount: '5954', videoCount: '218' },
            contentDetails: { relatedPlaylists: {} },
          },
        ],
      });
    }
    throw new Error(`Unexpected URL: ${url}`);
  };

  try {
    const response = await handler(new Request('https://example.netlify.app/api/youtube'));
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.success, true);
    assert.equal(
      response.headers.get('netlify-cdn-cache-control'),
      'public, durable, max-age=900, stale-while-revalidate=300',
    );
    assert.equal(response.headers.get('cache-control'), 'public, max-age=60');
  } finally {
    globalThis.fetch = originalFetch;
    if (previousKey === undefined) delete process.env.YOUTUBE_API_KEY;
    else process.env.YOUTUBE_API_KEY = previousKey;
  }
});

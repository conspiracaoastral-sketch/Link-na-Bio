import assert from 'node:assert/strict';
import test from 'node:test';
import {
  fetchYouTubeData,
  formatSubscribers,
  formatVideos,
  parseISO8601Duration,
} from '../netlify/functions/youtube-core.ts';

test('formats 5954 subscribers without rounding up to 6.0 thousand', () => {
  assert.equal(formatSubscribers('5954'), '5,95 MIL+');
});

test('formats subscriber counts and video counts with fallbacks', () => {
  assert.equal(formatSubscribers('1000'), '1,0 MIL+');
  assert.equal(formatSubscribers('invalid'), '5,9 MIL+');
  assert.equal(formatVideos('218'), '218+');
  assert.equal(formatVideos('invalid'), '200+');
});

test('parses ISO 8601 YouTube durations', () => {
  assert.equal(parseISO8601Duration('PT57M4S'), '57:04');
  assert.equal(parseISO8601Duration('PT1H2M3S'), '1:02:03');
  assert.equal(parseISO8601Duration('invalid'), '');
});

test('fetches channel metrics and shapes the latest public video', async () => {
  const requestedUrls: string[] = [];
  const fakeFetch: typeof fetch = async (input) => {
    const url = String(input);
    requestedUrls.push(url);

    if (url.includes('/channels?')) {
      return Response.json({
        items: [
          {
            statistics: {
              subscriberCount: '5954',
              videoCount: '218',
            },
            contentDetails: {
              relatedPlaylists: {
                uploads: 'UU_TEST_UPLOADS',
              },
            },
          },
        ],
      });
    }

    if (url.includes('/playlistItems?')) {
      return Response.json({
        items: [
          {
            status: { privacyStatus: 'public' },
            snippet: {
              resourceId: { videoId: 'video123' },
              title: 'Última aula publicada',
              description: 'Descrição da última aula.',
              publishedAt: '2026-08-06T12:00:00Z',
              thumbnails: {
                high: { url: 'https://img.example/high.jpg' },
              },
            },
          },
        ],
      });
    }

    if (url.includes('/videos?')) {
      return Response.json({
        items: [
          {
            contentDetails: { duration: 'PT57M4S' },
          },
        ],
      });
    }

    throw new Error(`Unexpected URL: ${url}`);
  };

  const result = await fetchYouTubeData('secret-key', fakeFetch);

  assert.equal(result.success, true);
  assert.deepEqual(result.metrics, {
    subscribers: '5,95 MIL+',
    videos: '218+',
  });
  assert.equal(result.latestVideo?.id, 'video123');
  assert.equal(result.latestVideo?.duration, '57:04');
  assert.equal(result.latestVideo?.thumbnail, 'https://img.example/high.jpg');
  assert.equal(result.latestVideo?.link, 'https://www.youtube.com/watch?v=video123');
  assert.ok(requestedUrls.every((url) => url.includes('key=secret-key')));
  assert.ok(requestedUrls[0].includes('id=UCRvl92NpytYWQ9JAfPmCeQA'));
});

test('returns a graceful failure when the channel request fails', async () => {
  const fakeFetch: typeof fetch = async () => new Response('error', { status: 500 });
  const result = await fetchYouTubeData('secret-key', fakeFetch);

  assert.equal(result.success, false);
  assert.match(result.error ?? '', /status 500/);
});

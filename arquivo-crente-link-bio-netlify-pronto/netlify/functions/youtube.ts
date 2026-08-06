import { fetchYouTubeData, type YouTubeApiResponse } from './youtube-core.ts';

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
};

function jsonResponse(
  payload: YouTubeApiResponse,
  status = 200,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...extraHeaders,
    },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'GET') {
    return jsonResponse(
      { success: false, error: 'Method not allowed' },
      405,
      { Allow: 'GET' },
    );
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return jsonResponse({
      success: false,
      error: 'YOUTUBE_API_KEY is not configured',
    });
  }

  const payload = await fetchYouTubeData(apiKey);

  if (!payload.success) {
    return jsonResponse(payload);
  }

  return jsonResponse(payload, 200, {
    'Cache-Control': 'public, max-age=60',
    'Netlify-CDN-Cache-Control':
      'public, durable, max-age=900, stale-while-revalidate=300',
  });
}

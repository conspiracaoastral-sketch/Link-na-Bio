export const YOUTUBE_CHANNEL_ID = 'UCRvl92NpytYWQ9JAfPmCeQA';
export const YOUTUBE_CHANNEL_VIDEOS_URL = 'https://www.youtube.com/@arquivocrente/videos';

export interface YouTubeVideoData {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  publishedAtFormatted: string;
  duration: string;
  description: string;
  link: string;
}

export interface YouTubeApiResponse {
  success: boolean;
  metrics?: {
    subscribers: string;
    videos: string;
  };
  latestVideo?: YouTubeVideoData;
  error?: string;
}

interface YouTubeThumbnail {
  url?: string;
}

interface ChannelApiItem {
  statistics?: {
    subscriberCount?: string;
    videoCount?: string;
  };
  contentDetails?: {
    relatedPlaylists?: {
      uploads?: string;
    };
  };
}

interface PlaylistApiItem {
  status?: {
    privacyStatus?: string;
  };
  snippet?: {
    resourceId?: {
      videoId?: string;
    };
    title?: string;
    description?: string;
    publishedAt?: string;
    thumbnails?: {
      maxres?: YouTubeThumbnail;
      high?: YouTubeThumbnail;
      medium?: YouTubeThumbnail;
      default?: YouTubeThumbnail;
    };
  };
}

function formatDecimal(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
}

export function parseISO8601Duration(durationStr: string): string {
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';

  const hours = match[1] ? Number.parseInt(match[1], 10) : 0;
  const minutes = match[2] ? Number.parseInt(match[2], 10) : 0;
  const seconds = match[3] ? Number.parseInt(match[3], 10) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatSubscribers(countStr: string): string {
  const count = Number.parseInt(countStr, 10);

  if (!Number.isFinite(count) || count < 0) {
    return '5,9 MIL+';
  }

  if (count >= 1_000_000) {
    const millions = Math.floor((count / 1_000_000) * 100) / 100;
    return `${formatDecimal(millions)} MI+`;
  }

  if (count >= 1_000) {
    const thousands = Math.floor((count / 1_000) * 100) / 100;
    return `${formatDecimal(thousands)} MIL+`;
  }

  return count.toLocaleString('pt-BR');
}

export function formatVideos(countStr: string): string {
  const count = Number.parseInt(countStr, 10);

  if (!Number.isFinite(count) || count < 0) {
    return '200+';
  }

  return `${count}+`;
}

function youtubeApiUrl(resource: string, params: Record<string, string>): string {
  const searchParams = new URLSearchParams(params);
  return `https://www.googleapis.com/youtube/v3/${resource}?${searchParams.toString()}`;
}

async function readJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

export async function fetchYouTubeData(
  apiKey: string,
  fetchImpl: typeof fetch = fetch,
): Promise<YouTubeApiResponse> {
  try {
    const channelUrl = youtubeApiUrl('channels', {
      part: 'snippet,statistics,contentDetails',
      id: YOUTUBE_CHANNEL_ID,
      key: apiKey,
    });

    const channelResponse = await fetchImpl(channelUrl);
    if (!channelResponse.ok) {
      return {
        success: false,
        error: `YouTube Channel API returned status ${channelResponse.status}`,
      };
    }

    const channelData = await readJson<{ items?: ChannelApiItem[] }>(channelResponse);
    const channel = channelData.items?.[0];

    if (!channel) {
      return { success: false, error: 'Channel not found' };
    }

    const subscriberCount = channel.statistics?.subscriberCount ?? '5900';
    const videoCount = channel.statistics?.videoCount ?? '200';
    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;

    let latestVideo: YouTubeVideoData | undefined;

    if (uploadsPlaylistId) {
      const playlistUrl = youtubeApiUrl('playlistItems', {
        part: 'snippet,status',
        playlistId: uploadsPlaylistId,
        maxResults: '5',
        key: apiKey,
      });

      const playlistResponse = await fetchImpl(playlistUrl);

      if (playlistResponse.ok) {
        const playlistData = await readJson<{ items?: PlaylistApiItem[] }>(playlistResponse);
        const items = playlistData.items ?? [];
        const publicItem =
          items.find((item) => item.status?.privacyStatus === 'public' || !item.status) ?? items[0];
        const snippet = publicItem?.snippet;
        const videoId = snippet?.resourceId?.videoId;

        if (snippet && videoId) {
          let duration = '';
          const videoDetailsUrl = youtubeApiUrl('videos', {
            part: 'snippet,contentDetails',
            id: videoId,
            key: apiKey,
          });
          const videoDetailsResponse = await fetchImpl(videoDetailsUrl);

          if (videoDetailsResponse.ok) {
            const videoDetails = await readJson<{
              items?: Array<{ contentDetails?: { duration?: string } }>;
            }>(videoDetailsResponse);
            const rawDuration = videoDetails.items?.[0]?.contentDetails?.duration;
            if (rawDuration) duration = parseISO8601Duration(rawDuration);
          }

          const thumbnails = snippet.thumbnails ?? {};
          const thumbnail =
            thumbnails.maxres?.url ??
            thumbnails.high?.url ??
            thumbnails.medium?.url ??
            thumbnails.default?.url ??
            '';
          const publishedAt = snippet.publishedAt ?? '';
          const publicationDate = new Date(publishedAt);
          const publishedAtFormatted = Number.isNaN(publicationDate.getTime())
            ? ''
            : publicationDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                timeZone: 'America/Sao_Paulo',
              });
          const description = snippet.description ?? '';

          latestVideo = {
            id: videoId,
            title: snippet.title ?? '',
            thumbnail,
            publishedAt,
            publishedAtFormatted,
            duration,
            description:
              description.length > 180 ? `${description.slice(0, 180)}...` : description,
            link: `https://www.youtube.com/watch?v=${videoId}`,
          };
        }
      }
    }

    return {
      success: true,
      metrics: {
        subscribers: formatSubscribers(subscriberCount),
        videos: formatVideos(videoCount),
      },
      latestVideo,
    };
  } catch (error) {
    console.error('Error fetching YouTube API data:', error);
    return {
      success: false,
      error: 'Failed to fetch YouTube data',
    };
  }
}

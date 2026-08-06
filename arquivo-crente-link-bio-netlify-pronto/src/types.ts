export interface BibleMeditation {
  id: number;
  reference: string;
  verse: string;
  meditation: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  coverImage?: string;
}

export interface SupportOption {
  title: string;
  description: string;
  buttonText?: string;
  link?: string;
  type?: string;
  key?: string;
  favored?: string;
}

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

export interface YouTubeMetricsData {
  subscribers: string;
  videos: string;
}

export interface YouTubeApiResponse {
  success: boolean;
  metrics?: YouTubeMetricsData;
  latestVideo?: YouTubeVideoData;
  error?: string;
}

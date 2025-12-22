
export interface DailyMessage {
  date: string;
  title: string;
  member: string;
  song: string;
  album: string;
  spotifyUrl: string;
  imageUrl: string;
  quote: string;
  reflection: string;
  affirmation: string;
  source?: 'sheet' | 'ai';
}

export type Theme = 'light' | 'dark';
export type Page = 'home' | 'archive' | 'archive-detail' | 'about-bts' | 'project' | 'mural' | 'contact' | 'app';

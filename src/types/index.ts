export type PageType = 'home' | 'builder' | 'publish' | 'gallery' | 'login' | 'profile';

export interface Tool {
  id: string;
  title: string;
  description: string;
  tags: string[];
  creator: string;
  likes: number;
  supportLink?: string;
  previewImage?: string;
  createdAt: Date;
  revenue?: number;
}

export interface GeneratedPreview {
  title: string;
  mockComponent: string;
  description: string;
}

export interface CreatedTool {
  title: string;
  likes: number;
  revenue: number;
}

export interface MonetizationStats {
  totalRevenue: number;
  usersSubscribed: number;
  toolName: string;
}
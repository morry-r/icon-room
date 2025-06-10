export interface Icon {
  id: string;
  name: string;
  description: string;
  category: string | null;
  tags: string[] | null;
  svg: string;
  created_at: string;
}

export type IconVariant = {
  id: string;
  icon_id: string;
  weight: 'small' | 'medium' | 'bold';
  svg: string;
  created_at: string;
}

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
} 
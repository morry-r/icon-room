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

export type IconWithSvg = {
  icon_id: string; 
  slug: string;
  name: string;          // icons.name
  category_name: string | null; // icons.category（NULL許容）
  tags: string[] | null; // icons.tags（NULL許容）
  svg: string;           // icon_variants.svg
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
} 
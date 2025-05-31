export interface Icon {
  id: string;
  name: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  tags: string[];
  svg: string;
  "svg-image": {
    url: string;
    height: number;
    width: number;
  };
  "icon-image"?: {
    url: string;
    height: number;
    width: number;
  };
  "fill-flg": boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  "max-stroke-width": number;
}

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
} 
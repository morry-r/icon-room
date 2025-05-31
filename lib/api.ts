import { createClient } from 'microcms-js-sdk';
import { Icon, Category } from './types';

// 環境変数の存在チェック
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error('microCMSの環境変数が設定されていません。.envファイルを確認してください。');
}

const microcms = createClient({
  serviceDomain,
  apiKey,
});

export const getIcons = async (): Promise<Icon[]> => {
  try {
    const { contents, totalCount } = await microcms.getList<Icon>({
      endpoint: 'icons',
      queries: {
        limit: 100,  // より大きな制限を設定
      },
    });

    // totalCountが100を超える場合、残りのアイコンを取得
    if (totalCount > 100) {
      const remainingPages = Math.ceil((totalCount - 100) / 100);
      const additionalRequests = Array.from({ length: remainingPages }, (_, i) => 
        microcms.getList<Icon>({
          endpoint: 'icons',
          queries: {
            limit: 100,
            offset: (i + 1) * 100,
          },
        })
      );

      const additionalResults = await Promise.all(additionalRequests);
      const additionalContents = additionalResults.flatMap(result => result.contents);
      return [...contents, ...additionalContents];
    }

    return contents;
  } catch (error) {
    console.error('Error fetching icons:', error);
    return [];
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { contents } = await microcms.getList<Category>({
      endpoint: 'categories',
    });
    return contents;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export async function getIcon(id: string): Promise<Icon | null> {
  try {
    const response = await microcms.get({
      endpoint: "icons",
      contentId: id,
    });
    return response;
  } catch (error) {
    console.error('Error fetching icon:', error);
    return null;
  }
}

export async function getRelatedIcons(id: string): Promise<Icon[]> {
  const icon = await getIcon(id);
  
  if (!icon) {
    return [];
  }

  try {
    const response = await microcms.getList({
      endpoint: "icons",
      queries: {
        filters: `category[equals]${icon.category.id}`,
        limit: 5,
      },
    });
    return response.contents.filter((relatedIcon) => relatedIcon.id !== id);
  } catch (error) {
    console.error('Error fetching related icons:', error);
    return [];
  }
} 
// app/(main)/icons/category/[slug]/page.tsx
import { Metadata } from 'next'
import { fetchIconsByCategory, fetchCategoryNameBySlug } from '@/lib/data'
import { IconGrid } from "@/components/icon-grid";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { categoryName } = await getCategoryName(params.slug)

  return {
    title: `${categoryName} のアイコン一覧`,
    description: `${categoryName} のアイコン一覧ページです。`,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const icons = await fetchIconsByCategory(params.slug)
  const { categoryName } = await getCategoryName(params.slug)

  return (
    <div>
      {icons.length > 0 ? (
        <>
          <h1>{categoryName} のアイコン一覧</h1>
          <div className="w-screen border-r p-4">
            <IconGrid icons={icons} />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-xl font-semibold mb-2">アイコンが存在しません</h1>
          <p className="text-gray-600">このカテゴリにはまだアイコンが登録されていません。</p>
        </div>
      )}
    </div>
  )
}

// カテゴリ名取得
async function getCategoryName(slug: string) {
  const categoryName = await fetchCategoryNameBySlug(slug)
  
  return { categoryName }
}
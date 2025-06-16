// app/(main)/icons/category/[slug]/page.tsx
import { Metadata } from 'next'
import { fetchIconsByTag, fetchTagNameBySlug } from '@/lib/data'
import { IconGrid } from "@/components/icon-grid";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { tagName } = await getTagName(params.slug)

  return {
    title: `${tagName} のアイコン一覧`,
    description: `${tagName} のアイコン一覧ページです。`,
  }
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  console.log(params.slug)
  const icons = await fetchIconsByTag(params.slug)
  const { tagName } = await getTagName(params.slug)

  return (
    <div>
      {icons.length > 0 ? (
        <>
          <h1>{tagName} のアイコン一覧</h1>
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
async function getTagName(slug: string) {
  const tagName = await fetchTagNameBySlug(slug)
  
  return { tagName }
}
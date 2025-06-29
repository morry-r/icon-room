// app/(main)/icons/category/[slug]/page.tsx
import { Metadata } from 'next'
import { fetchIconsByTag, fetchTagNameBySlug } from '@/lib/data'
import { IconList } from "@/components/icon-list";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { tagName } = await getTagName(params.slug)

  return {
    title: `${tagName} のアイコン一覧`,
    description: `${tagName} のアイコン一覧ページです。`,
  }
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  const [filled, bold, thin] = await Promise.all([
    fetchIconsByTag(params.slug, 'filled'),
    fetchIconsByTag(params.slug, 'bold'),
    fetchIconsByTag(params.slug, 'thin'),
  ])
  const { tagName } = await getTagName(params.slug)

  return (
    <div>
      {[filled, bold, thin].length > 0 ? (
        <>
          <h1>{tagName} のアイコン一覧</h1>
          <IconList iconsByWeight={{ filled, bold, thin }} />
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
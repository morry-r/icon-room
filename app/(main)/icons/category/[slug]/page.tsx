// app/(main)/icons/category/[slug]/page.tsx
import { Metadata } from 'next'
// import { fetchIconsByCategory } from '@/lib/data'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `${params.slug} Icons`,
    description: `Browse our collection of ${params.slug} icons`,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
//   const icons = await fetchIconsByCategory(params.slug)
  
  return (
    <div>
      <h1>{params.slug} Icons</h1>
      {/* アイコン一覧の表示 */}
    </div>
  )
}
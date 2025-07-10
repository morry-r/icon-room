

import { fetchTagList } from '@/lib/data';
import { TagEditForm } from '@/components/tag-edit-form';
import { notFound } from 'next/navigation';

export default async function AdminTagsEdit({ params }: { params: { id: string } }) {
  // 全カテゴリを取得して、IDで該当するカテゴリを見つける
  const tags = await fetchTagList();
  const tag = tags.find(tag => tag.id === params.id);
  
  if (!tag) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">タグ編集</h1>
        <p className="text-gray-600">タグの情報を編集できます</p>
      </div>
      
      <div className="flex-1">
        <TagEditForm tag={tag} />
      </div>
    </div>
  )
}
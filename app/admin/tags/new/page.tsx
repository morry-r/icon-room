

import { TagCreateForm } from '@/components/tag-create-form';

export default async function AdminCreateTags({ }: {  }) {

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">タグ新規作成</h1>
        <p className="text-gray-600">タグの情報を新規作成できます</p>
      </div>
      
      <div className="flex-1">
        <TagCreateForm />
      </div>
    </div>
  )
}
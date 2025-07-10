

import { CategoryCreateForm } from '@/components/category-create-form';

export default async function AdminCreateCategories({ }: {  }) {

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">カテゴリ編集</h1>
        <p className="text-gray-600">カテゴリの情報を編集できます</p>
      </div>
      
      <div className="flex-1">
        <CategoryCreateForm />
      </div>
    </div>
  )
}
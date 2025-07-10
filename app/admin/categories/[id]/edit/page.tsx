

import { fetchCategoryList } from '@/lib/data';
import { CategoryEditForm } from '@/components/category-edit-form';
import { notFound } from 'next/navigation';

export default async function AdminCategoriesEdit({ params }: { params: { id: string } }) {
  // 全カテゴリを取得して、IDで該当するカテゴリを見つける
  const categories = await fetchCategoryList();
  const category = categories.find(cat => cat.id === params.id);
  
  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">カテゴリ編集</h1>
        <p className="text-gray-600">カテゴリの情報を編集できます</p>
      </div>
      
      <div className="flex-1">
        <CategoryEditForm category={category} />
      </div>
    </div>
  )
}
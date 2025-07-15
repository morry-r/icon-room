import IconCreateForm from '@/components/icon-create-form';
import { fetchCategoryList, fetchTagList } from '@/lib/data';

export default async function AdminIconsNew() {
  const categoryList = await fetchCategoryList()
  const tagList = await fetchTagList()
  
    return (
      <div className="flex flex-col min-h-screen p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">アイコン新規追加</h1>
          <p className="text-gray-600">アイコンの情報を新規追加できます</p>
        </div>
        
        <div className="flex-1">
          <IconCreateForm categoryList={categoryList} tagList={tagList} />
        </div>
      </div>
    )
  }
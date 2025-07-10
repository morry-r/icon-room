import { fetchCategoryList } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

export default async function AdminCategories() {
  const categories = await fetchCategoryList();
  
    return (
      <div className="flex flex-col h-screen p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">カテゴリ一覧</h1>
          <p className="text-gray-600">全{categories.length}件のカテゴリ</p>
        </div>
        <div className="flex justify-end mb-4">
          <Link href="/admin/categories/new" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            新規追加
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto">
          <Table className="border border-gray-400">
            <TableHeader>
              <TableRow>
                <TableHead className="border border-gray-400">名前</TableHead>
                <TableHead className="border border-gray-400">スラッグ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((categories) => (
                <TableRow key={categories.id}>
                  <TableCell className="font-medium border border-gray-400">
                    <Link 
                      href={`/admin/categories/${categories.id}/edit/`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {categories.name}
                    </Link>
                  </TableCell>
                  <TableCell className="border border-gray-400">
                    {categories.slug}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
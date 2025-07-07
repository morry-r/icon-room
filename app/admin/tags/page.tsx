import { fetchTagList } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

export default async function AdminTags() {
  const tags = await fetchTagList();
  
    return (
      <div className="flex flex-col h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">タグ一覧</h1>
        <p className="text-gray-600">全{tags.length}件のタグ</p>
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
            {tags.map((tags) => (
              <TableRow key={tags.id}>
                <TableCell className="font-medium border border-gray-400">
                  <Link 
                    href={`/admin/tags/${tags.id}/edit/`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {tags.name}
                  </Link>
                </TableCell>
                <TableCell className="border border-gray-400">
                  {tags.slug}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    )
  }
import { fetchAdminIconList } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function AdminIcons() {
  const icons = await fetchAdminIconList();
  
  return (
    <div className="flex flex-col h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">アイコン一覧</h1>
        <p className="text-gray-600">全{icons.length}件のアイコン</p>
      </div>
      <div className="flex justify-end mb-4">
        <Link href="/admin/icons/new" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          新規追加
        </Link>
      </div>

      
      <div className="flex-1 overflow-auto">
        <Table className="border border-gray-400">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-gray-400">SVG</TableHead>
              <TableHead className="border border-gray-400">タイトル</TableHead>
              <TableHead className="border border-gray-400">カテゴリ</TableHead>
              <TableHead className="border border-gray-400">タグ</TableHead>
              <TableHead className="border border-gray-400">作成日付</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {icons.map((icon) => (
              <TableRow key={icon.icon_id}>
                <TableCell className="border border-gray-400">
                  {icon.svg && (
                    <div 
                      className="w-8 h-8 flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: icon.svg }}
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium border border-gray-400">
                  <Link 
                    href={`/admin/icons/${icon.icon_id}/edit/`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {icon.name}
                  </Link>
                </TableCell>
                <TableCell className="border border-gray-400">
                  {icon.category_name || (
                    <span className="text-gray-400">未分類</span>
                  )}
                </TableCell>
                <TableCell className="border border-gray-400">
                  <div className="flex flex-wrap gap-1">
                    {icon.tag_names && icon.tag_names.length > 0 ? (
                      icon.tag_names.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">タグなし</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="border border-gray-400">
                  {new Date(icon.created_at).toLocaleDateString('ja-JP')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
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

export default async function AdminIcons() {
  const icons = await fetchAdminIconList();
  
  return (
    <div className="flex flex-col h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">アイコン一覧</h1>
        <p className="text-gray-600">全{icons.length}件のアイコン</p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SVG</TableHead>
              <TableHead>タイトル</TableHead>
              <TableHead>カテゴリ</TableHead>
              <TableHead>タグ</TableHead>
              <TableHead>作成日付</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {icons.map((icon) => (
              <TableRow key={icon.icon_id}>
                <TableCell>
                  {icon.svg && (
                    <div 
                      className="w-8 h-8 flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: icon.svg }}
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {icon.name}
                </TableCell>
                <TableCell>
                  {icon.category_name || (
                    <span className="text-gray-400">未分類</span>
                  )}
                </TableCell>
                <TableCell>
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
                <TableCell>
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
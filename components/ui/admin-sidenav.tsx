"use client";
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default async function AdminSidenav() {
  const pathname = usePathname();
  
  return (
    <div className="flex w-full h-full flex-col px-3 py-4 md:px-4">
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex flex-col space-y-2">ダッシュボード</div>
        <div className="flex flex-col space-y-2">素材投稿</div>
            <Link
              href={`/admin/icons`}
              className={clsx(
                'flex h-10 grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-gray-100 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === `/admin/icons`,
                }
              )}
            >
              素材一覧
            </Link>
      </div>
    </div>
  ); 
} 
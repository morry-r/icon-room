"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Category, Tag } from '@/lib/types';

export default function SidenavClient({ categories, tags }: { categories: Category[], tags: Tag[] }) {
  const pathname = usePathname();


  return (
    <div className="flex w-full h-full flex-col px-3 py-4 md:px-4">
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex flex-col space-y-2">カテゴリ</div>

        {categories.map((category) => (
            <Link
              key={category.id}
              href={`/icons/category/${category.slug}`}
              className={clsx(
                'flex h-10 grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-gray-100 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === `/icons/category/${category.slug}`,
                }
              )}
            >
              {category.name}
            </Link>
          ))
        }
       
      </div>
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex flex-col space-y-2">タグ</div>

        {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/icons/tag/${tag.slug}`}
              className={clsx(
                'flex h-10 grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-gray-100 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === `/icons/category/${tag.slug}`,
                }
              )}
            >
              {tag.name}
            </Link>
          ))
        }
       
      </div>
    </div>
  );
} 
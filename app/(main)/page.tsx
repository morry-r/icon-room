import { IconList } from "@/components/icon-list";
import { fetchIconListData } from "@/lib/data";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Icon Room',
    default: 'Icon room',
  },
  description: 'アイコンのフリー素材サイトです。',
};

export default async function Page() {
  const [filled, bold, thin] = await Promise.all([
    fetchIconListData('filled'),
    fetchIconListData('bold'),
    fetchIconListData('thin'),
  ])

  return <IconList iconsByWeight={{ filled, bold, thin }} />
}
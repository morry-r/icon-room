import { IconGrid } from "@/components/icon-grid";
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

  const icons = await fetchIconListData();

  return (
    <div className="w-screen border-r p-4">
      <IconGrid icons={icons} />
    </div>  
  );
}
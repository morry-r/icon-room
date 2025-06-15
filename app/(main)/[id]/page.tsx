import { IconDetail } from "@/components/icon-detail";
import { fetchIconListData } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function IconPage({ params }: { params: { id: string } }) {
  try {
    // const icon = await getIcon(params.id);
    // if (!icon) {
    //   return notFound();
    // }
    // const relatedIcons = await getRelatedIcons(params.id);
    // return <IconDetail icon={icon} relatedIcons={relatedIcons} />;
  } catch (error) {
    console.error("Error loading icon page:", error);
    return notFound();
  }
  return (
    <div>
      <h1>{params.id} Icons</h1>
      {/* アイコン一覧の表示 */}
    </div>
  )
} 
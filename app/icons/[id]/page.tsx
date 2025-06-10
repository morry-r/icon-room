import { IconDetail } from "@/components/icon-detail";
import { fetchIconData } from "@/lib/data";
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
} 
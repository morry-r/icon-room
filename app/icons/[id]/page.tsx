import { IconDetail } from "@/components/icon-detail";
import { getIcons, getIcon, getRelatedIcons } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const icons = await getIcons();
    console.log('Generating static params for icons:', icons.map(icon => icon.id));
    return icons.map((icon) => ({
      id: icon.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function IconPage({ params }: { params: { id: string } }) {
  try {
    const icon = await getIcon(params.id);
    if (!icon) {
      return notFound();
    }
    const relatedIcons = await getRelatedIcons(params.id);
    return <IconDetail icon={icon} relatedIcons={relatedIcons} />;
  } catch (error) {
    console.error("Error loading icon page:", error);
    return notFound();
  }
} 
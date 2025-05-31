import { getIcons } from "@/lib/api";
import { IconDetail } from "@/components/icon-detail";

export async function generateStaticParams() {
  const icons = await getIcons();
  return icons.map((icon) => ({
    id: icon.id,
  }));
}

export default async function IconDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const icons = await getIcons();
  const icon = icons.find((i) => i.id === params.id);
  const relatedIcons = icons.filter(
    (i) => i.category === icon?.category && i.id !== icon?.id
  );

  if (!icon) {
    return <div>アイコンが見つかりませんでした</div>;
  }

  return <IconDetail icon={icon} relatedIcons={relatedIcons} />;
} 
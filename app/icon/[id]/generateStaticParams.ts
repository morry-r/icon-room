import { getIcons } from "@/lib/api";

export async function generateStaticParams() {
  const icons = await getIcons();
  return icons.map((icon) => ({
    id: icon.id,
  }));
} 
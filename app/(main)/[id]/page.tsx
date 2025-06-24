import { fetchIconDetailData } from "@/lib/data";
import { IconDetail } from '@/components/icon-detail'

export default async function IconPage({ params }: { params: { id: string } }) {

  const iconDetail = await fetchIconDetailData(params.id, 'filled')

  return (
    <div>
      <IconDetail icon={iconDetail} />
    </div>
  )
} 
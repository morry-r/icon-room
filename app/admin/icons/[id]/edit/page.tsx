import { fetchAdminIconEditData} from "@/lib/data";
import EditIconForm from "@/components/icon-edit";

export default async function AdminIconsEdit({ params }: { params: { id: string } }) {
  const iconEditData = await fetchAdminIconEditData(params.id)
  

  return (
    <>
      <EditIconForm iconEditData={iconEditData} />
    </>
  )
}
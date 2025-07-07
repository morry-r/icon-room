import { fetchAdminIconEditData, fetchCategoryList, fetchTagList} from "@/lib/data";
import EditIconForm from "@/components/icon-edit";

export default async function AdminIconsEdit({ params }: { params: { id: string } }) {
  const iconEditData = await fetchAdminIconEditData(params.id)
  const categoryList = await fetchCategoryList()
  const tagList = await fetchTagList()
  

  return (
    <>
      <EditIconForm iconEditData={iconEditData} categoryList={categoryList} tagList={tagList} />
    </>
  )
}
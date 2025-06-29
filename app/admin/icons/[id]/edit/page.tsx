import { fetchAdminIconEditData} from "@/lib/data";
import { IconEditSvg } from "@/components/icon-edit-svg";

export default async function AdminIconsEdit({ params }: { params: { id: string } }) {
  const iconEditData = await fetchAdminIconEditData(params.id)
  const filledIcon = iconEditData.find(icon => icon.weight === 'filled')
  const boldIcon = iconEditData.find(icon => icon.weight === 'bold')
  const thinIcon = iconEditData.find(icon => icon.weight === 'thin')

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold">{iconEditData[0].name}</h1>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full h-52">
            <h4>塗りアイコン</h4>
            <IconEditSvg key="filled" svgCode={filledIcon?.svg || ''} weight={filledIcon?.weight || ''} />
          </div>
          <div className="flex flex-col w-full h-52">
            <h4>太めアイコン</h4>
            <IconEditSvg key="bold" svgCode={boldIcon?.svg || ''} weight={boldIcon?.weight || ''} />
          </div>
          <div className="flex flex-col w-full h-52">
            <h4>細めアイコン</h4>
            <IconEditSvg key="thin" svgCode={thinIcon?.svg || ''} weight={thinIcon?.weight || ''} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-64 bg-gray-100">
        保存ボタン
      </div>
    </div>
  )
}
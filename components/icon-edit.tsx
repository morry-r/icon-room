'use client';

import { AdminIconEdit } from '@/lib/types';
import { IconEditSvg } from "@/components/icon-edit-svg";
import { IconEditName } from "@/components/icon-edit-name";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function EditIconForm({
    iconEditData
}: {
    iconEditData: AdminIconEdit[];
}) {
    //   const updateSvgWithId = updateIconSvg.bind(null, iconEditData[0].icon_id);
    //   const [state, formAction] = useActionState(updateSvgWithId, initialState);
    type State = {
        message: string | null;
        errors: {
          [key: string]: string;
        };
    };
    
    const initialState: State = {
        message: null,
        errors: {},
    };
    const [state, setState] = useState(initialState)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('フォームが送信されました');
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
        console.log('送信するデータ:', {
          name: formData.get('name'),
          svg_filled: formData.get('svg_filled'),
          svg_bold: formData.get('svg_bold'),
          svg_thin: formData.get('svg_thin')
        });
        
        const res = await fetch(`/api/admin/icons/${iconEditData[0].icon_id}/edit`, {
          method: 'POST',
          body: formData,
        })
        
        const result = await res.json()
        setState(result)
    }

    const filledIcon = iconEditData.find(icon => icon.weight === 'filled')
    const boldIcon = iconEditData.find(icon => icon.weight === 'bold')
    const thinIcon = iconEditData.find(icon => icon.weight === 'thin')
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex h-screen w-full">
                <div className="flex flex-col w-full p-6">
                    <IconEditName initialName={iconEditData[0].name} />
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
                <Button type="submit" className="flex flex-col w-64 bg-gray-100">
                    保存ボタン
                </Button>
                {state.message && <p className="text-green-600 mt-4">{state.message}</p>}
                {Object.entries(state.errors).map(([key, msg]) => (
                <p key={key} className="text-red-600">{key}: {msg}</p>
                ))}
            </div>  
        </form>
    );
}

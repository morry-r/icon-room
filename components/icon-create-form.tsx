'use client';

import { AdminIconEdit, Category, Tag } from '@/lib/types';
import { IconEditSvg } from "@/components/icon-edit-svg";
import { IconEditName } from "@/components/icon-edit-name";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function IconCreateForm({
    categoryList,
    tagList
}: {
    categoryList: Category[];
    tagList: Tag[];
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

    // タグ選択用のstateを追加
    const [selectedTags, setSelectedTags] = useState<string[]>(
        []
    );

    // タグを追加する関数
    const addTag = (tagName: string) => {
        if (!selectedTags.includes(tagName)) {
            setSelectedTags([...selectedTags, tagName]);
        }
    };

    // タグを削除する関数
    const removeTag = (tagName: string) => {
        setSelectedTags(selectedTags.filter(tag => tag !== tagName));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('フォームが送信されました');
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
        // 選択されたタグをフォームデータに追加
        selectedTags.forEach(tag => {
            formData.append('tags[]', tag);
        });
        
        console.log('送信するデータ:', {
          name: formData.get('name'),
          svg_filled: formData.get('svg_filled'),
          svg_bold: formData.get('svg_bold'),
          svg_thin: formData.get('svg_thin')
        });
        
        const res = await fetch(`/api/admin/icons/new`, {
          method: 'POST',
          body: formData,
        })
        
        const result = await res.json()
        setState(result)
        
        // 成功時にページをリロード
        if (result.message) {
          window.location.reload();
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex w-full">
                <div className="flex flex-col w-full p-6">
                    <IconEditName initialName={''} initialSlug={''} />
                    <div>
                        カテゴリ
                        <select name="category" id="category">
                            {categoryList.map((category) => (
                                <option 
                                    key={category.id} 
                                    value={category.id}
                                    selected={category.name === ''}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        タグ
                        <div className="flex gap-2 mb-2">
                            <select 
                                onChange={(e) => {
                                    if (e.target.value) {
                                        addTag(e.target.value);
                                        e.target.value = ''; // 選択をリセット
                                    }
                                }}
                                className="border rounded px-2 py-1"
                            >
                                <option value="">タグを選択</option>
                                {tagList
                                    .filter(tag => !selectedTags.includes(tag.name))
                                    .map((tag) => (
                                        <option key={tag.id} value={tag.name}>
                                            {tag.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        
                        {/* 選択されたタグの表示 */}
                        <div className="flex flex-wrap gap-2">
                            {selectedTags.map((tagName) => (
                                <span 
                                    key={tagName}
                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                                >
                                    {tagName}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tagName)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col w-full h-52">
                            <h4>塗りアイコン</h4>
                            <IconEditSvg key="filled" svgCode={''} weight={'filled'} />
                        </div>
                        <div className="flex flex-col w-full h-52">
                            <h4>太めアイコン</h4>
                            <IconEditSvg key="bold" svgCode={''} weight={'bold'} />
                        </div>
                        <div className="flex flex-col w-full h-52">
                            <h4>細めアイコン</h4>
                            <IconEditSvg key="thin" svgCode={''} weight={'thin'} />
                        </div>
                    </div>
                </div>
                <Button type="submit" className="flex flex-col w-64">
                    保存
                </Button>
                {state.message && <p className="text-green-600 mt-4">{state.message}</p>}
                {Object.entries(state.errors).map(([key, msg]) => (
                <p key={key} className="text-red-600">{key}: {msg}</p>
                ))}
            </div>  
        </form>
    );
}

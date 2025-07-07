import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  
  const supabase = await createClient();
  const iconId = params.id;
  const formData = await req.formData();

  const name = formData.get('name') as string | null;
  const category = formData.get('category') as string | null;
  const tags = formData.getAll('tags[]') as string[];
  const svg_filled = formData.get('svg_filled') as string | null;
  const svg_bold = formData.get('svg_bold') as string | null;
  const svg_thin = formData.get('svg_thin') as string | null;

  const errors: Record<string, string> = {};

  // 簡易バリデーション
  if (!name) errors.name = '名前は必須です';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: null, errors }, { status: 400 });
  }

  // DB更新
  try {
    // アイコン名とカテゴリを更新
    const updateData: any = { name };
    if (category) {
      updateData.category_id = category;
    }
    await supabase.from('icons').update(updateData).eq('id', iconId);

    // タグを更新
    if (tags.length > 0) {
      // 既存のタグを削除
      await supabase.from('icon_tags').delete().eq('icon_id', iconId);
      
      // 新しいタグを追加
      for (const tagName of tags) {
        // タグ名からtag_idを取得
        const { data: tagData } = await supabase
          .from('tags')
          .select('id')
          .eq('name', tagName)
          .single();
        
        if (tagData) {
          await supabase.from('icon_tags').insert({
            icon_id: iconId,
            tag_id: tagData.id
          });
        }
      }
    } else {
      // タグが空の場合は既存のタグを全て削除
      await supabase.from('icon_tags').delete().eq('icon_id', iconId);
    }

    // SVGごとに更新（あれば）
    if (svg_filled) {
      await supabase.from('icon_variants').update({ svg: svg_filled }).match({ icon_id: iconId, weight: 'filled' });
    }
    if (svg_bold) {
      await supabase.from('icon_variants').update({ svg: svg_bold }).match({ icon_id: iconId, weight: 'bold' });
    }
    if (svg_thin) {
      await supabase.from('icon_variants').update({ svg: svg_thin }).match({ icon_id: iconId, weight: 'thin' });
    }

    return NextResponse.json({ message: '保存しました', errors: {} });
  } catch (e) {
    console.error('更新失敗:', e);
    return NextResponse.json(
      { message: 'サーバーエラーが発生しました', errors: {} },
      { status: 500 }
    );
  }
}

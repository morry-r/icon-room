import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  
  const supabase = await createClient();
  const formData = await req.formData();

  const name = formData.get('name') as string | null;
  const slug = formData.get('slug') as string | null;
  const category = formData.get('category') as string | null;
  const tags = formData.getAll('tags[]') as string[];
  const svg_filled = formData.get('svg_filled') as string | null;
  const svg_bold = formData.get('svg_bold') as string | null;
  const svg_thin = formData.get('svg_thin') as string | null;

  const errors: Record<string, string> = {};

  // 簡易バリデーション
  if (!name) errors.name = '名前は必須です';
  if (!slug) errors.slug = 'スラッグ名は必須です';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: null, errors }, { status: 400 });
  }

  // DB更新
  try {
    // アイコン名とカテゴリを更新
    const insertData: any = { name, slug };
    if (category) {
      insertData.category_id = category;
    }
    const { data, error } = await supabase
      .from('icons')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json(
        { error: 'Failed to create tag' },
        { status: 500 }
      );
    }

    // タグを更新
    if (tags.length > 0) {
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
            icon_id: data.id,
            tag_id: tagData.id
          });
        }
      }
    }
    

    // SVGごとに更新（あれば）
    if (svg_filled) {
      const svgInsertData: any = { icon_id: data.id, weight: 'filled', svg: svg_filled };
      await supabase.from('icon_variants').insert(svgInsertData).select().single();
    } else {
      const svgInsertData: any = { icon_id: data.id, weight: 'filled', svg: '' };
      await supabase.from('icon_variants').insert(svgInsertData).select().single();
    }
    if (svg_bold) {
      const svgInsertData: any = { icon_id: data.id, weight: 'bold', svg: svg_bold };
      await supabase.from('icon_variants').insert(svgInsertData).select().single();
    } else {
      const svgInsertData: any = { icon_id: data.id, weight: 'bold', svg: '' };
      await supabase.from('icon_variants').insert(svgInsertData).select().single();
    }
    if (svg_thin) {
      const svgInsertData: any = { icon_id: data.id, weight: 'thin', svg: svg_thin };
      await supabase.from('icon_variants').insert(svgInsertData).select().single();
    } else {
      const svgInsertData: any = { icon_id: data.id, weight: 'thin', svg: '' };
      await supabase.from('icon_variants').insert(svgInsertData).select().single();
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

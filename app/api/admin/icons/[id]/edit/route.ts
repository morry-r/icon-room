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
    // アイコン名を更新
    await supabase.from('icons').update({ name }).eq('id', iconId);

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

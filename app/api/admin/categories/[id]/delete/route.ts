import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // このカテゴリに関連するアイコンがあるかチェック
    const { data: icons, error: iconsError } = await supabase
      .from('icons')
      .select('id, name')
      .eq('category_id', params.id);

    if (iconsError) {
      console.error('Error checking related icons:', iconsError);
      return NextResponse.json(
        { error: 'Failed to check related icons' },
        { status: 500 }
      );
    }

    // 関連するアイコンがある場合は削除を拒否
    if (icons && icons.length > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete category',
          message: `このカテゴリには${icons.length}個のアイコンが関連付けられています。先にアイコンを削除または移動してください。`,
          relatedIcons: icons
        },
        { status: 400 }
      );
    }
    
    // 関連するアイコンがない場合は削除を実行
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json(
        { error: 'Failed to delete category' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
} 
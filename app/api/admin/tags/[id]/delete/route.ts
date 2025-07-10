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
      .from('icon_tags')
      .select('icon_id')
      .eq('tag_id', params.id);

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
          error: 'Cannot delete tag',
          message: `このタグにはアイコンが関連付けられています。先にアイコンを削除または移動してください。`,
          relatedIcons: icons
        },
        { status: 400 }
      );
    }
    
    // 関連するアイコンがない場合は削除を実行
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json(
        { error: 'Failed to delete tag' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { error: 'Failed to delete tag' },
      { status: 500 }
    );
  }
} 
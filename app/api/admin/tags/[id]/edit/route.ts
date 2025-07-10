import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, slug } = await request.json();
    
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('tags')
      .update({ 
        name, 
        slug, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json(
        { error: 'Failed to update tag' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json(
      { error: 'Failed to update tag' },
      { status: 500 }
    );
  }
} 
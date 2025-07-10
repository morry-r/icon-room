'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag } from '@/lib/types';
import { z } from 'zod';

// バリデーションスキーマ
const tagSchema = z.object({
  name: z.string()
    .min(1, 'タグ名は必須です')
    .max(50, 'タグ名は50文字以内で入力してください')
    .refine((value) => !/[<>\"'&]/.test(value), {
      message: 'HTMLタグや特殊文字は使用できません'
    }),
  slug: z.string()
    .min(1, 'スラッグは必須です')
    .max(50, 'スラッグは50文字以内で入力してください')
    .regex(/^[a-zA-Z0-9-]+$/, 'スラッグは半角英数字とハイフンのみ使用できます')
    .refine((value) => !value.startsWith('-') && !value.endsWith('-'), {
      message: 'スラッグはハイフンで始まったり終わったりできません'
    })
});

interface TagCreateFormProps {
  tag: Tag;
}

export function TagCreateForm() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; slug?: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    try {
      tagSchema.parse({ name, slug });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { name?: string; slug?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'name') {
            newErrors.name = err.message;
          }
          if (err.path[0] === 'slug') {
            newErrors.slug = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/tags/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, slug }),
      });

      if (response.ok) {
        router.push('/admin/tags');
        router.refresh();
      } else {
        console.error('Failed to create tag');
      }
    } catch (error) {
      console.error('Error creating tag:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>タグ新規作成</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">タグ名</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="タグ名を入力"
              required
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">スラッグ</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="スラッグを入力"
              required
              className={errors.slug ? 'border-red-500' : ''}
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug}</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '作成中...' : '新規作成'}
            </Button>
            <Button 
              type="button" 
              className="bg-gray-500 hover:bg-gray-400 active:bg-gray-600"
              onClick={() => router.push('/admin/tags')}
            >
              キャンセル
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 
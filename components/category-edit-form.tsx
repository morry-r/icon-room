'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/lib/types';
import { z } from 'zod';

// バリデーションスキーマ
const categorySchema = z.object({
  name: z.string()
    .min(1, 'カテゴリ名は必須です')
    .max(50, 'カテゴリ名は50文字以内で入力してください')
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

interface CategoryEditFormProps {
  category: Category;
}

export function CategoryEditForm({ category }: CategoryEditFormProps) {
  const [name, setName] = useState(category.name);
  const [slug, setSlug] = useState(category.slug);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; slug?: string }>({});
  const router = useRouter();

  // カテゴリ更新
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // バリデーション
    try {
        categorySchema.parse({ name, slug });
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
      const response = await fetch(`/api/admin/categories/${category.id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, slug }),
      });

      if (response.ok) {
        router.push('/admin/categories');
        router.refresh();
      } else {
        console.error('Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // カテゴリ削除
  const handleDelete = async () => {
    if (!confirm(`カテゴリ「${category.name}」を削除しますか？この操作は取り消せません。`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/categories/${category.id}/delete`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/categories');
        router.refresh();
      } else {
        const errorData = await response.json();
        console.error('Failed to delete category:', errorData);
        
        if (errorData.message) {
          alert(errorData.message);
        } else {
          alert('カテゴリの削除に失敗しました。');
        }
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('カテゴリの削除に失敗しました。');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>カテゴリ情報</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">カテゴリ名</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="カテゴリ名を入力"
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
              {isLoading ? '更新中...' : '更新'}
            </Button>
            <Button 
              type="button" 
              className="bg-gray-500 hover:bg-gray-400 active:bg-gray-600"
              onClick={() => router.push('/admin/categories')}
            >
              キャンセル
            </Button>
            <Button 
              type="button" 
              className="bg-red-500 hover:bg-red-400 active:bg-red-600"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? '削除中...' : '削除'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 
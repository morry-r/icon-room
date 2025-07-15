"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export function IconEditName({ initialName, initialSlug }: { initialName: string, initialSlug: string }) {
  const [name, setName] = useState(initialName)
  const [slug, setSlug] = useState(initialSlug)
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">アイコン名</label>
      <Input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-2xl font-bold h-12"
        placeholder="アイコン名を入力してください"
      />
      <label className="block text-sm font-medium mb-2">スラッグ名</label>
      <Input
        name="slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="text-2xl font-bold h-12"
        placeholder="スラッグ名を入力してください"
      />
    </div>
  )
} 
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export function IconEditName({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName)

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
    </div>
  )
} 
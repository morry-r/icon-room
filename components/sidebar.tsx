"use client";

import { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  className?: string;
}

export function Sidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  className,
}: SidebarProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-lg font-semibold">カテゴリ</h2>
      <div className="space-y-2">
        <Button
          variant={selectedCategory === "" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onCategorySelect("")}
        >
          すべて
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
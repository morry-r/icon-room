"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [
  "すべて",
  "ビジネス",
  "コミュニケーション",
  "デザイン",
  "開発",
  "教育",
  "金融",
  "健康",
  "ライフスタイル",
  "メディア",
  "ソーシャル",
  "テクノロジー",
  "天気",
];

export function CategoryFilter() {
  return (
    <div className="relative">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-2 p-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant="secondary"
              className="flex-shrink-0"
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
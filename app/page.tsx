"use client";

import { useState, useEffect } from "react";
import { IconGrid } from "@/components/icon-grid";
import { Sidebar } from "@/components/sidebar";
import { Icon, Category } from "@/lib/types";
import { fetchIconData } from "@/lib/data";
import { Header } from "@/components/header";

export default function Home() {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // 初期処理
  // アイコンとカテゴリーを取得
  useEffect(() => {
    // const fetchData = async () => {
    //   const [fetchedIcons, fetchedCategories] = await Promise.all([
    //     getIcons(),
    //     getCategories(),
    //   ]);
    //   setIcons(fetchedIcons);
    //   setCategories(fetchedCategories);
    // };
    // fetchData();
  }, []);

  // 選択されたカテゴリーに応じてフィルタリング
  // const filteredIcons = selectedCategory
  //   ? icons.filter((icon) => icon.category.id === selectedCategory)
  //   : icons;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 mt-16 bg-[#EEE]">
        <div className="w-64 border-r p-4">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>
        <main className="flex-1 p-4">
          {/* <IconGrid icons={filteredIcons} /> */}
        </main>
      </div>
    </div>
  );
}
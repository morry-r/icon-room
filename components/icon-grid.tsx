"use client";

import { useState, useEffect } from "react";
import { Icon, Category } from "@/lib/types";
import { fetchIconData } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

interface IconGridProps {
  icons: Icon[];
}

export function IconGrid({ icons }: IconGridProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
      // const [fetchedCategories] = await Promise.all([
        // getCategories(),
    //   ]);
    //   setCategories(fetchedCategories);
    // };
  //   fetchData();
  // }, []);

  // const filteredIcons = icons.filter((icon) => {
  //   const matchesCategory = selectedCategory
  //     ? icon.category.id === selectedCategory
  //     : true;
  //   const matchesSearch = searchQuery
  //     ? icon.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     : true;
  //   return matchesCategory && matchesSearch;
  // });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {icons.map((icon) => (
        <Link
          key={icon.id}
          href={`/icons/${icon.id}`}
          className="group"
        >
          <div
            className="aspect-square rounded-lg p-4 flex items-center justify-center transition-all duration-200 hover:shadow-[3px_3px_5px_rgba(0,0,0,0),-3px_-3px_5px_rgba(255,255,255,0),3px_3px_5px_rgba(0,0,0,0.1)_inset,-3px_-3px_5px_rgba(255,255,255,1)_inset]"
            style={{
              background: "#EEE",
              boxShadow: "3px 3px 5px rgba(0, 0, 0, .1), -3px -3px 5px rgba(255, 255, 255, 1)",
              borderRadius: "10px"
            }}
          >
            {/* {icon["icon-image"] && (
              <div className="relative w-full h-full">
                <Image
                  src={icon["icon-image"].url}
                  alt={icon.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
            )} */}
          </div>
          <p className="mt-2 text-sm text-center text-gray-600 group-hover:text-gray-900">
            {icon.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
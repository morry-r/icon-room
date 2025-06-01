"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="border-b fixed top-0 left-0 right-0 bg-[#EEE] z-50">
      <div className="container flex h-16 items-center px-4 gap-4">
        <Link href="/">
          <h1 className="text-xl font-bold">Icon Room</h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="アイコンを検索..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
} 
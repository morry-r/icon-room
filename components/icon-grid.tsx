"use client";

import { IconList, Category } from "@/lib/types";
import Link from "next/link";

interface IconGridProps {
  icons: IconList[];
}


export function IconGrid({ icons }: IconGridProps) {
 
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-7">
        {icons.map((icon) => (
          <Link
            key={icon.icon_id}
            href={`/${icon.icon_id}`}
            className="group aspect-square"
          >
            <div
              className="w-full h-full
              rounded-lg p-4 flex items-center justify-center transition-all duration-200 hover:shadow-[3px_3px_5px_rgba(0,0,0,0),-3px_-3px_5px_rgba(255,255,255,0),3px_3px_5px_rgba(0,0,0,0.1)_inset,-3px_-3px_5px_rgba(255,255,255,1)_inset]"
              style={{
                background: "#EEE",
                boxShadow: "3px 3px 5px rgba(0, 0, 0, .1), -3px -3px 5px rgba(255, 255, 255, 1)",
                borderRadius: "10px"
              }}
            >
              {icon.svg && (
                  <div className="icon-svg flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 " dangerouslySetInnerHTML={{ __html: icon.svg }} />
              )}
            </div>
            <p className="mt-2 text-sm text-center text-gray-600 group-hover:text-gray-900">
              {icon.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
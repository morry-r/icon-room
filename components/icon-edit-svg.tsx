"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function IconEditSvg({ svgCode, weight }: { svgCode: string; weight: string }) {
  const [currentSvgCode, setCurrentSvgCode] = useState(svgCode)

  return (
    <div className="flex gap-6 h-48">
      {/* SVGコード編集エリア */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">SVGコード ({weight})</label>
        <Textarea
          name={`svg_${weight}`} 
          value={currentSvgCode}
          onChange={(e) => setCurrentSvgCode(e.target.value)}
          className="h-36 resize-none"
          placeholder="SVGコードを入力してください"
        />
      </div>
      
      {/* プレビューエリア */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">プレビュー</label>
        <div className="flex items-center justify-center h-36 bg-gray-100 rounded-lg border">
          {currentSvgCode ? (
            <div 
              className="flex justify-center items-center h-16 w-16" 
              dangerouslySetInnerHTML={{ __html: currentSvgCode }} 
            />
          ) : (
            <div className="text-gray-500 text-sm">SVGコードを入力してください</div>
          )}
        </div>
      </div>
    </div>
  )
}
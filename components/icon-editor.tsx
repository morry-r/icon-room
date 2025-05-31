"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/ui/color-picker";
import { Icon } from "@/lib/types";

interface IconEditorProps {
  icon: Icon;
  onSave: (svg: string) => void;
}

export function IconEditor({ icon, onSave }: IconEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(24);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvasのサイズを設定
    canvas.width = size;
    canvas.height = size;

    // SVGをCanvasに描画
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
    };
    img.src = `data:image/svg+xml;base64,${btoa(icon.svg)}`;
  }, [icon.svg, size]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // CanvasからSVGを生成
    const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${icon.svg}" stroke="${color}" stroke-width="${strokeWidth}" />
    </svg>`;

    onSave(svg);
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="border rounded-lg" />
      <div className="space-y-2">
        <label className="text-sm font-medium">線の太さ</label>
        <Slider
          value={[strokeWidth]}
          onValueChange={([value]) => setStrokeWidth(value)}
          min={1}
          max={10}
          step={1}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">色</label>
        <ColorPicker value={color} onChange={setColor} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">サイズ</label>
        <Slider
          value={[size]}
          onValueChange={([value]) => setSize(value)}
          min={16}
          max={128}
          step={8}
        />
      </div>
      <Button onClick={handleSave}>保存</Button>
    </div>
  );
} 
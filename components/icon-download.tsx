"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/types";
// import { logDownload } from "@/lib/api";

interface IconDownloadProps {
  icon: Icon;
  svg: string;
}

export function IconDownload({ icon, svg }: IconDownloadProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (format: "svg" | "png") => {
    try {
      setDownloading(true);

      // ダウンロードログを記録
    //   await logDownload({
    //     iconId: icon.id,
    //     downloadedAt: new Date(),
    //     format,
    //   });

      // ファイルをダウンロード
      const blob = format === "svg"
        ? new Blob([svg], { type: "image/svg+xml" })
        : await convertSvgToPng(svg);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${icon.name}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  const convertSvgToPng = async (svgString: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to convert to PNG"));
          }
        }, "image/png");
      };
      img.onerror = () => reject(new Error("Failed to load SVG"));
      img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => handleDownload("svg")}
        disabled={downloading}
      >
        SVGをダウンロード
      </Button>
      <Button
        variant="outline"
        onClick={() => handleDownload("png")}
        disabled={downloading}
      >
        PNGをダウンロード
      </Button>
    </div>
  );
} 
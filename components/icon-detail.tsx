"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { IconGrid } from "@/components/icon-grid";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";

interface IconDetailProps {
  icon: Icon;
  relatedIcons: Icon[];
}

export function IconDetail({ icon, relatedIcons }: IconDetailProps) {
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [iconSize, setIconSize] = useState(200);
  const [iconColor, setIconColor] = useState("#000000");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [recentColors, setRecentColors] = useState<string[]>(() => {
    // ブラウザ環境でのみローカルストレージを使用して色を設定
    if (typeof window !== 'undefined') {
      try {
        const savedColors = localStorage.getItem('recentColors');
        return savedColors ? JSON.parse(savedColors) : ['#FF0000', '#0000FF', '#FFFF00'];
      } catch (e) {
        console.error('Failed to parse saved colors:', e);
        return ['#FF0000', '#0000FF', '#FFFF00'];
      }
    }
    return ['#FF0000', '#0000FF', '#FFFF00'];
  });

  useEffect(() => {
    // SVGの読み込み
    const loadSvgContent = async () => {
      try {
        if (!icon["svg-image"]?.url) { //オプショナルチェイニングを使用している
          throw new Error("SVG画像が見つかりません");
        }

        const response = await fetch(icon["svg-image"].url);
        if (!response.ok) {
          throw new Error("SVGの読み込みに失敗しました");
        }

        const content = await response.text(); // レスポンスのボディをテキストとして取得
        setSvgContent(content);
        setError(null);
      } catch (err) {
        console.error("Error loading SVG:", err);
        setError(err instanceof Error ? err.message : "SVGの読み込みに失敗しました");
      }
    };

    loadSvgContent();
  }, [icon["svg-image"]?.url]); //この値が変わった時に再レンダリングされる

  const handleStrokeWidthChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= icon["max-stroke-width"]) {
      setStrokeWidth(num);
    }
  };

  const handleIconSizeChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 100 && num <= 300) {
      setIconSize(num);
    }
  };

  const handleColorChange = (color: string) => {
    setIconColor(color);
  };

  const handleColorPickerClose = (color: string) => {
    // 最近使用した色を更新（最新の色を先頭に）
    // 既存の色がある場合は除外してから新しい色を追加
    const filteredColors = recentColors.filter(c => c.toLowerCase() !== color.toLowerCase());
    const newRecentColors = [color, ...filteredColors].slice(0, 3); // 最新の3色のみ保持
    setRecentColors(newRecentColors);
    
    // ローカルストレージに保存
    if (typeof window !== 'undefined') { //ブラウザ環境で実行されているかどうかをチェック
      localStorage.setItem('recentColors', JSON.stringify(newRecentColors));
    }

    // テキストボックスの値も更新
    const hexColor = color.replace('#', '');
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input) {
      input.value = hexColor;
    }
  };

  const handleHexColorChange = (value: string) => {
    // 3桁のHEXコードを6桁に変換
    if (value.length === 3 && /^[0-9A-Fa-f]{3}$/.test(value)) {
      value = value.split('').map(c => c + c).join('');
    }
    
    // 6桁のHEXコードのバリデーション
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setIconColor(value);
      // 最近使用した色を更新
      const filteredColors = recentColors.filter(c => c.toLowerCase() !== value.toLowerCase());
      const newRecentColors = [value, ...filteredColors].slice(0, 3);
      setRecentColors(newRecentColors);
      
      // ローカルストレージに保存
      if (typeof window !== 'undefined') {
        localStorage.setItem('recentColors', JSON.stringify(newRecentColors));
      }
    } else if (/^[0-9A-Fa-f]{6}$/.test(value)) {
      const colorWithHash = '#' + value;
      setIconColor(colorWithHash);
      // 最近使用した色を更新
      const filteredColors = recentColors.filter(c => c.toLowerCase() !== colorWithHash.toLowerCase());
      const newRecentColors = [colorWithHash, ...filteredColors].slice(0, 3);
      setRecentColors(newRecentColors);
      
      // ローカルストレージに保存
      if (typeof window !== 'undefined') {
        localStorage.setItem('recentColors', JSON.stringify(newRecentColors));
      }
    }
  };

  const generateEditedSvg = () => {
    if (!svgContent) return "";
    
    // SVGのスタイルを更新
    let updatedSvg = svgContent;

    // path要素にfillとstroke-widthの属性を追加または更新
    updatedSvg = updatedSvg.replace(/<path[^>]*>/g, (match) => {
      let updatedPath = match;
      console.log(updatedPath);
      
      // fill属性の追加または更新
      if (icon["fill-flg"]) {
        if (updatedPath.includes('fill=')) {
          updatedPath = updatedPath.replace(/fill="[^"]*"/, `fill="${iconColor}"`);
        } else {
          updatedPath = updatedPath.replace('<path', `<path fill="${iconColor}"`);
        }
      } else {
        if (updatedPath.includes('fill=')) {
          updatedPath = updatedPath.replace(/fill="[^"]*"/, 'fill="none"');
        } else {
          updatedPath = updatedPath.replace('<path', '<path fill="none"');
        }
      }
      console.log(updatedPath);

      // stroke属性の追加または更新
      if (updatedPath.includes('stroke=')) {
        updatedPath = updatedPath.replace(/stroke="[^"]*"/, `stroke="${iconColor}"`);
      } else {
        updatedPath = updatedPath.replace('<path', `<path stroke="${iconColor}"`);
      }
      console.log(updatedPath);

      // stroke-width属性の追加または更新
      if (updatedPath.includes('stroke-width=')) {
        updatedPath = updatedPath.replace(/stroke-width="[^"]*"/, `stroke-width="${strokeWidth}"`);
      } else {
        updatedPath = updatedPath.replace('<path', `<path stroke-width="${strokeWidth}"`);
      }

      // パスタグの閉じ方を修正
      updatedPath = updatedPath.replace('>', '/>');

      return updatedPath;
    });

    // SVGのサイズを取得
    const svgWidth = icon["svg-image"].width;
    const svgHeight = icon["svg-image"].height;

    // 線幅が50pxまで太くできるように余白を設ける
    const padding = 100; // 余白のサイズ
    const viewBoxValue = `-${padding/2} -${padding/2} ${svgWidth + padding} ${svgHeight + padding}`;
    updatedSvg = updatedSvg.replace(/viewBox="[^"]*"/, `viewBox="${viewBoxValue}" preserveAspectRatio="xMidYMid meet"`);
    
    // SVGタグにスタイルを追加
    return updatedSvg.replace(
      '<svg',
      '<svg style="width: 100%; height: 100%;"'
    );
  };

  const handleDownload = () => {
    try {
      if (!svgContent) {
        throw new Error("SVGの内容が見つかりません");
      }

      // 編集されたSVGを生成
      const editedSvg = generateEditedSvg();

      // 一時的なCanvasを作成
      const canvas = document.createElement('canvas');
      const size = iconSize;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas context could not be created");

      // SVGをBlobに変換
      const svgBlob = new Blob([editedSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);

      // SVGを画像として読み込み
      const img = new Image();
      img.onload = () => {
        // Canvasに描画
        ctx.drawImage(img, 0, 0, size, size);
        
        // PNGとしてダウンロード
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `${icon.name}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (error) {
      console.error("Error downloading PNG:", error);
      setError("PNGのダウンロードに失敗しました");
    }
  };
  
  // SVGをシンプルな形式に変換する関数
  const simplifyAndCleanSvg = (svgContent: string | null, color: string, strokeWidth: number): string => {
    if (!svgContent) return "";
    
    try {
      // 基本的なSVG構造をパース
      let cleaned = svgContent;
      
      // viewBox属性を抽出
      const viewBoxMatch = cleaned.match(/viewBox="([^"]+)"/);
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24"; // デフォルト値
      
      // パスやその他の図形要素を抽出
      const pathMatch = cleaned.match(/<path[^>]*>/g) || [];
      const circleMatch = cleaned.match(/<circle[^>]*>/g) || [];
      const rectMatch = cleaned.match(/<rect[^>]*>/g) || [];
      const lineMatch = cleaned.match(/<line[^>]*>/g) || [];
      const polylineMatch = cleaned.match(/<polyline[^>]*>/g) || [];
      const polygonMatch = cleaned.match(/<polygon[^>]*>/g) || [];
      
      // すべての図形要素を集める
      const allShapes = [
        ...pathMatch, 
        ...circleMatch, 
        ...rectMatch, 
        ...lineMatch, 
        ...polylineMatch, 
        ...polygonMatch
      ];
      
      // クラスを使用している属性を置き換え
      const shapesWithUpdatedStyle = allShapes.map(shape => {
        // クラス参照を直接スタイルに置き換え
        return shape
          .replace(/class="[^"]*"/g, '')
          .replace(/stroke="[^"]*"/g, `stroke="${color}"`)
          .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`)
          .replace(/fill="[^"]*"/g, 'fill="none"');
      });
      
      // 新しいSVG構造を作成
      const simplifiedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${shapesWithUpdatedStyle.join('')}</svg>`;
      console.log(simplifiedSvg);
      // 空白を整理して1行に
      return simplifiedSvg.replace(/\s+/g, ' ').trim();
    } catch (error) {
      console.error("SVG簡略化エラー:", error);
      return svgContent?.replace(/\s+/g, ' ').trim() || "";
    }
  };

  // 更新されたSVG変換とダウンロード処理
  const generateSimplifiedSvg = () => {
    if (!svgContent) return "";
    return simplifyAndCleanSvg(svgContent, iconColor, strokeWidth);
  };
  // SVGダウンロード処理の更新
  const handleSVGDownload = () => {
    try {
      if (!svgContent) {
        throw new Error("SVGの内容が見つかりません");
      }

      // 編集されたSVGを生成
      const editedSvg = generateEditedSvg();
      
      // SVGの内容を取得
      const svgBlob = new Blob([editedSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      
      // ダウンロードリンクを作成
      const link = document.createElement('a');
      link.href = url;
      link.download = `${icon.name}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading SVG:", error);
      setError("SVGのダウンロードに失敗しました");
    }
  };
  
  // SVGコードを1行に整形する関数
  const getSingleLineSvg = (svg: string | null): string => {
    if (!svg) return "";
    // 空白、タブ、改行を削除し、1行に整形
    return svg.replace(/\s+/g, ' ').trim();
  };
  
  // 更新されたSVGコンテンツ
  const updatedSvgContent = generateEditedSvg();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(getSingleLineSvg(updatedSvgContent) || "");
    setCopyButtonText("Copied");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#EEE]">
      <Header />

      <div className="container mt-16 mx-10 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 左側: アイコン表示 */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{icon.name}</h1>
              </div>

              <div 
                className="rounded-lg p-8 flex items-center justify-center"
                style={{ 
                  width: "100%", 
                  maxWidth: "500px",
                  aspectRatio: "1/1",
                  background: "#EEE",
                  boxShadow: "3px 3px 5px rgba(0, 0, 0, .1), -3px -3px 5px rgba(255, 255, 255, 1)",
                  borderRadius: "10px",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-full w-full text-red-500">
                    {error}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-secondary rounded-lg p-4">
                    <div
                      className="w-full h-full flex items-center justify-center"
                      dangerouslySetInnerHTML={{
                        __html: updatedSvgContent ? 
                          updatedSvgContent
                            .replace('<svg', '<svg style="width: 80%; height: 80%;"')
                            .replace('viewBox="', `viewBox="0 0 ${icon["svg-image"].width+100} ${icon["svg-image"].height+100}" preserveAspectRatio="xMidYMid meet"`) : 
                          "",
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 右側: 編集コントロール */}
            <div className="space-y-6">
              <div className="space-y-9">
                <div>
                  <label className="block text-base tracking-wider font-medium mb-2 font-['Lato']">
                    Width
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 p-2 rounded-lg" style={{
                      background: "#EEE"
                    }}>
                      <input
                        type="range"
                        min="1"
                        max={icon["max-stroke-width"]}
                        value={strokeWidth}
                        onChange={(e) => setStrokeWidth(Number(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)]"
                        style={{
                          background: "linear-gradient(to right, #EEE, #CCC)",
                          boxShadow: "inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.7)"
                        }}
                        disabled={isLoading || !!error}
                      />
                    </div>
                    <div className="rounded-lg bg-white">
                      <Input
                        type="number"
                        min="1"
                        max={icon["max-stroke-width"]}
                        value={strokeWidth}
                        onChange={(e) => handleStrokeWidthChange(e.target.value)}
                        className="w-20 text-center border-0"
                        disabled={isLoading || !!error}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-base tracking-wider font-medium mb-2 font-['Lato']">
                    Color
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg" style={{
                        background: "#EEE",
                        borderRadius: "5px"
                      }}>
                        <input
                          type="color"
                          value={iconColor}
                          onChange={(e) => handleColorChange(e.target.value)}
                          onBlur={(e) => handleColorPickerClose(e.target.value)}
                          className="h-10 w-20 rounded-[5px] border-0 outline-none appearance-none [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-[5px]"
                          disabled={isLoading || !!error}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">#</span>
                        <input
                          type="text"
                          defaultValue={iconColor.replace('#', '')}
                          onChange={(e) => handleHexColorChange(e.target.value)}
                          className="w-20 px-2 py-1 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={6}
                          placeholder="FFFFFF"
                          disabled={isLoading || !!error}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {recentColors.map((color, index) => (
                        <button
                          key={index}
                          className="w-8 h-8 rounded-md border cursor-pointer"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                          title={`${index + 1}回前に使用した色: ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-base tracking-wider font-medium mb-2 font-['Lato']">
                    Size(PNG)
                  </label>
                  <div className="flex">
                    {[25, 50, 100, 200, 500, 1000].map((size) => (
                      <div key={size} className="flex-1">
                        <input
                          type="radio"
                          id={`size-${size}`}
                          name="size"
                          value={size}
                          checked={iconSize === size}
                          onChange={(e) => setIconSize(Number(e.target.value))}
                          className="hidden peer"
                        />
                        <label
                          htmlFor={`size-${size}`}
                          className="block w-full text-center py-2 px-4 border-l first:border-l last:border-r cursor-pointer peer-checked:shadow-inner peer-checked:bg-gray-100 peer-checked:translate-y-0.5 transition-all duration-100"
                          style={{
                            boxShadow: iconSize === size 
                              ? "inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.7)"
                              : "2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.7)"
                          }}
                        >
                          {size}px
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleDownload}
                    disabled={isLoading || !!error}
                    className="flex-1 backdrop-blur-md border border-blue-200/20 shadow-lg text-blue-900"
                    style={{
                      background: "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))",
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PNG
                  </Button>
                  <Button
                    onClick={handleSVGDownload}
                    disabled={isLoading || !!error}
                    className="flex-1 backdrop-blur-md border border-blue-200/20 shadow-lg text-blue-900"
                    style={{
                      background: "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))",
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    SVG
                  </Button>
                </div>

                {/* // コンポーネントのレンダリング部分 (SVGコード表示部分) */}
                <div className="mt-4">
                  <label className="block text-base tracking-wider font-medium mb-2 font-['Lato']">
                    SVGコード
                  </label>
                  <div className="relative">
                    <div className="p-4 rounded-lg overflow-x-auto text-base tracking-wider max-h-[100px]" style={{
                      background: "#333",
                      boxShadow: "inset 3px 3px 5px rgba(0, 0, 0, .3), inset -3px -3px 5px rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      color: "#fff"
                    }}>
                      <code className="whitespace-nowrap">{getSingleLineSvg(updatedSvgContent)}</code>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="absolute top-2 right-2 rounded-[5px] bg-white hover:bg-gray-100"
                      onClick={handleCopyClick}
                    >
                      {copyButtonText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 同じカテゴリのアイコン */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              同じカテゴリのアイコン
            </h2>
            <IconGrid icons={relatedIcons} />
          </div>
        </div>
      </div>
    </div>
  );
} 
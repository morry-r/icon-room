export async function loadSVG(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load SVG: ${response.statusText}`);
  }
  return await response.text();
}

export function drawSVGOnCanvas(
  canvas: HTMLCanvasElement,
  svgString: string,
  options: { strokeWidth: number; color: string; size: number }
) {
  const { strokeWidth, color, size } = options;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // キャンバスのサイズを設定
  canvas.width = size;
  canvas.height = size;

  // キャンバスをクリア
  ctx.clearRect(0, 0, size, size);

  // SVGのスタイルを更新
  const updatedSvgString = svgString.replace(
    /<style>[\s\S]*?<\/style>/,
    `<style>
      .cls-1 {
        fill: none;
        stroke: ${color};
        stroke-width: ${strokeWidth}px;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    </style>`
  );

  // SVGをBlobに変換
  const blob = new Blob([updatedSvgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  // 画像を読み込んで描画
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
}

export async function loadImage(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load image: ${response.status}`);
    }
    return url; // URLをそのまま返す
  } catch (error) {
    console.error('Error loading image:', error);
    throw error;
  }
}

export function drawImageOnCanvas(
  canvas: HTMLCanvasElement,
  imageUrl: string,
  options: { strokeWidth: number; color: string; size: number }
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Canvasのサイズを設定
  canvas.width = options.size;
  canvas.height = options.size;

  // Canvasをクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 画像を読み込んで描画
  const img = new Image();
  img.onload = () => {
    try {
      // 画像を描画
      ctx.drawImage(img, 0, 0, options.size, options.size);

      // 色を適用
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const rgb = hexToRgb(options.color);

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) { // アルファチャンネルが0より大きい場合（透明でない場合）
          data[i] = rgb.r;     // R
          data[i + 1] = rgb.g; // G
          data[i + 2] = rgb.b; // B
        }
      }

      ctx.putImageData(imageData, 0, 0);
    } catch (error) {
      console.error('Error drawing image:', error);
    }
  };

  img.onerror = (error) => {
    console.error('Error loading image:', error);
  };

  img.src = imageUrl;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error("Invalid hex color");
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
} 
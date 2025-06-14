import './globals.css';
import type { Metadata } from 'next';
import { inter } from '@/components/ui/fonts';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
// import './globals.css';
import type { Metadata } from 'next';
import { inter } from '@/components/ui/fonts';
import { Header } from "@/components/header";
import Sidenav from "@/components/ui/sidenav";

export const metadata: Metadata = {
  title: {
    template: '%s | Icon Room',
    default: 'Icon room',
  },
  description: 'アイコンのフリー素材サイトです。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex min-h-screen mt-16">
        <div className="flex w-64 bg-[#EEE]">
          <Sidenav />
        </div>
        <main className="w-full p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
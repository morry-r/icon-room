import { Header } from '@/components/header';
import AdminSidenav from '@/components/ui/admin-sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Header />
      </div>
      <div className="flex min-h-screen mt-16">
        <div className="flex w-64 bg-[#EEE]">
          <AdminSidenav />
        </div>
        <main className="w-full p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
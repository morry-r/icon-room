import { Header } from '@/components/header';
import AdminSidenav from '@/components/ui/admin-sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Header />
      <div className="flex w-full min-h-screen mt-16">
        <div className="flex w-64" style={{ backgroundColor: '#EEE' }}>
          <AdminSidenav />
        </div>
        <main className="w-full p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
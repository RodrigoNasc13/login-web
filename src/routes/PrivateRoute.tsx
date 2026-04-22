import { Loader } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from '../components/Sidebar';
import { useGetMe } from '../features/auth/api/use-get-me';
import { DashboardSidebar } from '../features/dashboard/components/sidebar/DashboardSidebar';
import { Topbar } from '../features/dashboard/components/topbar/Topbar';

export function PrivateRoute() {
  const { data, isLoading, isError } = useGetMe();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian">
        <Loader className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !data) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-obsidian font-body text-white">
        <DashboardSidebar />

        <SidebarInset className="relative flex w-full flex-1 flex-col bg-transparent">
          <Topbar />

          <main className="relative flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-default-gray/50 via-obsidian to-obsidian md:pt-0">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

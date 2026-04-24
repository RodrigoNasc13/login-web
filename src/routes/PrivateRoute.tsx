import { Loader } from 'lucide-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from '../components/Sidebar';
import { useGetMe } from '../features/auth/api/use-get-me';
import { DashboardSidebar } from '../features/dashboard/components/sidebar/DashboardSidebar';
import { Topbar } from '../features/dashboard/components/topbar/Topbar';
import type { OutletContext } from '../types/outlet-context';

export function PrivateRoute() {
  const { data, isLoading, isError } = useGetMe();
  const location = useLocation();

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

  if (data.role === 'USER') {
    if (location.pathname !== '/user') {
      return <Navigate to="/user" replace />;
    }

    return <Outlet context={{ user: data } satisfies OutletContext} />;
  }

  if (location.pathname === '/user') {
    return <Navigate to="/dashboard/admins" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full font-body text-white">
        <DashboardSidebar user={data} />

        <SidebarInset className="relative flex w-full flex-1 flex-col bg-transparent">
          <Topbar />

          <main className="relative flex-1 overflow-auto bg-obsidian md:pt-0">
            <Outlet context={{ user: data } satisfies OutletContext} />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

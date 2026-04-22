import { Loader } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetMe } from '../features/auth/api/use-get-me';

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

  return <Outlet />;
}

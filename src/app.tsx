import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './pages/AdminDashboard';
import { Auth } from './pages/Auth';
import { UserDashboard } from './pages/UserDashboard';
import { UserPage } from './pages/UserPage';
import { PrivateRoute } from './routes/PrivateRoute';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/admins" element={<AdminDashboard />} />
          <Route path="/dashboard/users" element={<UserDashboard />} />
          <Route path="/user" element={<UserPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

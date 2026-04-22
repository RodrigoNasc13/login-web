import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './pages/AdminDashboard';
import { Auth } from './pages/Auth';
import { PrivateRoute } from './routes/PrivateRoute';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { PrivateRoute } from './routes/PrivateRoute';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}></Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

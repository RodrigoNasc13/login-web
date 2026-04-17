import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './App';
import { GlobalToaster } from './components/Toaster';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <GlobalToaster />
    </QueryClientProvider>
  </StrictMode>,
);

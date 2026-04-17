import { Toaster } from 'react-hot-toast';

export function GlobalToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#24252d',
          color: '#fff',
          border: '1px solid rgba(71, 71, 78, 0.4)',
          backdropFilter: 'blur(20px)',
        },
        success: { iconTheme: { primary: '#3fff8b', secondary: '#24252d' } },
        error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
      }}
    />
  );
}

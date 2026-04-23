import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '../../../api/api';

interface LogoutResponse {
  message: string;
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<LogoutResponse> => {
      const response = await api.post('/auth/logout');
      return response.data;
    },
    onSuccess: (data: LogoutResponse) => {
      toast.success(data.message);

      queryClient.clear();
      window.location.href = '/login';
    },
  });
}

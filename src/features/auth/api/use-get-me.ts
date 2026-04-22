import { useQuery } from '@tanstack/react-query';
import { api } from '../../../api/api';

interface GetMeResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export function useGetMe() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async (): Promise<GetMeResponse> => {
      const response = await api.get('/users/me');
      return response.data;
    },
    retry: false,
  });
}

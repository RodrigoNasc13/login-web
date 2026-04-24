import { useQuery } from '@tanstack/react-query';
import { api } from '../../../api/api';
import type { User } from '../../../types/user';

interface GetMeResponse {
  user: User;
}

export function useGetMe() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async (): Promise<User> => {
      const response = await api.get<GetMeResponse>('/users/me');
      return response.data.user;
    },
    retry: false,
  });
}

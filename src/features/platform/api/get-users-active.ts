import { useQuery } from '@tanstack/react-query';
import { api } from '../../../api/api';

interface GetUsersActiveResponse {
  activeUsersCount: number;
  lastUserRegistrationDate: string;
}

export function useGetUsersActive() {
  return useQuery({
    queryKey: ['users', 'active', 'count'],
    queryFn: async (): Promise<GetUsersActiveResponse> => {
      const response = await api.get<GetUsersActiveResponse>(
        '/users/active/count',
      );
      return response.data;
    },
  });
}

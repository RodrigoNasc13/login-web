import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { api } from '../../../../api/api';
import type { SpringPage } from '../../../../types/spring-page';
import type { User } from '../../../../types/user';

export function useGetUsers(page = 0, size = 10) {
  return useQuery({
    queryKey: ['user', 'users', page, size],
    queryFn: async (): Promise<SpringPage<User>> => {
      const response = await api.get<SpringPage<User>>('/users/regular', {
        params: {
          page,
          size,
        },
      });
      return response.data;
    },

    placeholderData: keepPreviousData,
  });
}

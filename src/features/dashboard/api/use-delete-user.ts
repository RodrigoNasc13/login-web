import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../../api/api';
import type { StandErrorResponse } from '../../../types/api';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  async function deleteUser(userId: string): Promise<void> {
    await api.delete(`/users/${userId}`);
  }

  return useMutation<void, AxiosError<StandErrorResponse>, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'active', 'count'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'users'] });

      toast.success('User deleted successfully');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error ||
          'An error occurred while deleting the user. Please try again.',
      );
    },
  });
}

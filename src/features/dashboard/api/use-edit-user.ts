import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../../api/api';
import type { EditUserFormData } from '../../../components/forms/schemas/edit-user-form-schema';
import type { StandErrorResponse } from '../../../types/api';

export function useEditUser() {
  const queryClient = useQueryClient();

  async function editUser({
    userId,
    userData,
  }: {
    userId: string;
    userData: EditUserFormData;
  }): Promise<void> {
    await api.put(`/users/${userId}`, userData);
  }

  return useMutation<
    void,
    AxiosError<StandErrorResponse>,
    { userId: string; userData: EditUserFormData }
  >({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'active', 'count'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'users'] });

      toast.success('User updated successfully');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error ||
          'An error occurred while updating the user. Please try again.',
      );
    },
  });
}

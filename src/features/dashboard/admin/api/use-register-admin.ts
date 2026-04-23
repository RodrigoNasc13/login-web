import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../../../api/api';
import type { RegisterFormData } from '../../../../components/forms/schemas/register-user-form-schema';
import type { StandErrorResponse } from '../../../../types/api';
import type { RegisterResponse } from '../../../../types/register';

async function registerUser(data: RegisterFormData): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>('/users/admin', data);

  return response.data;
}

export function useRegisterAdmin() {
  const queryClient = useQueryClient();

  return useMutation<
    RegisterResponse,
    AxiosError<StandErrorResponse>,
    RegisterFormData
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(
        `User ${data.user.name} has been successfully registered as an admin!`,
      );

      queryClient.invalidateQueries({ queryKey: ['users', 'active', 'count'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error ||
          'An error occurred during registration. Please try again.',
      );
    },
  });
}

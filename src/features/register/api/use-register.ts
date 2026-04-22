import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../../api/api';
import type { StandErrorResponse } from '../../../types/api';
import type { RegisterFormData } from '../schemas/register-form-schema';

type RegisterResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

async function registerUser(data: RegisterFormData): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>('/users', data);

  return response.data;
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation<
    RegisterResponse,
    AxiosError<StandErrorResponse>,
    RegisterFormData
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(
        `Congratulations ${data.user.name}! Now make login to your account`,
      );

      queryClient.invalidateQueries({ queryKey: ['users', 'active', 'count'] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error ||
          'An error occurred during registration. Please try again.',
      );
    },
  });
}

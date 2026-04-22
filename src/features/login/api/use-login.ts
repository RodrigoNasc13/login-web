import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../../api/api';
import type { StandErrorResponse } from '../../../types/api';
import type { LoginFormData } from '../schemas/login-form-schema';

type LoginResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', data);

  return response.data;
}

export function useLogin() {
  return useMutation<
    LoginResponse,
    AxiosError<StandErrorResponse>,
    LoginFormData
  >({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(`Welcome, ${data.user.name}!`);
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error ||
          'An error occurred during login. Please try again.',
      );
    },
  });
}

import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../../api/api';
import type { LoginFormData } from '../shemas/login-form-shema';

interface StandErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  path: string;
}

type LoginResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  access_token: string;
  token_type: string;
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
      localStorage.setItem('user_id', data.user.id);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('access_token', data.access_token);

      toast.success(`Welcome back, ${data.user.name}!`);
    },
    onError: (error) => {
      console.error('Login error:', error.response?.data.error);

      toast.error(
        error.response?.data.error ||
          'An error occurred during login. Please try again.',
      );
    },
  });
}

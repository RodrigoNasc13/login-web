import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterUserForm } from '../../components/forms/RegisterUserForm';
import {
  type RegisterFormData,
  registerFormSchema,
} from '../../components/forms/schemas/register-user-form-schema';
import { useRegister } from './api/use-register';

interface RegisterFormProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RegisterForm({ setIsLogin }: RegisterFormProps) {
  const { reset } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { mutate, isPending, isError } = useRegister();

  function handleRegister(data: RegisterFormData) {
    mutate(data, {
      onSuccess: () => {
        reset({
          email: '',
          name: '',
          password: '',
        });
        setIsLogin(true);
      },
    });
  }

  return (
    <RegisterUserForm
      onSubmit={handleRegister}
      isPending={isPending}
      isError={isError}
    />
  );
}

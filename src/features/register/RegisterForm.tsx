import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RegisterUserForm } from '../../components/forms/RegisterUserForm';
import {
  type RegisterFormData,
  registerFormSchema,
} from '../../components/forms/schemas/register-user-form-schema';
import { useRegisterUser } from '../platform/api/use-register-user';

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

  const { mutate, isPending, isError } = useRegisterUser();

  function handleRegister(data: RegisterFormData) {
    mutate(data, {
      onSuccess: (data) => {
        reset({
          email: '',
          name: '',
          password: '',
        });

        toast.success(
          `Congratulations ${data.user.name}! Now make login to your account`,
        );
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

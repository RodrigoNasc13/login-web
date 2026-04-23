import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, Loader, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { ErrorField } from '../../components/ErrorField';
import * as Input from '../../components/input/Index';
import { useLogin } from './api/use-login';
import {
  type LoginFormData,
  loginFormSchema,
} from './schemas/login-form-schema';

export function LoginForm() {
  const { register, formState, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending, isError } = useLogin();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleLogin(data: LoginFormData) {
    mutate(data, {
      onSuccess: () => {
        window.location.href = '/dashboard/admins';
      },
    });
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
      <div className="group space-y-2">
        <Input.Label htmlFor="email">Email address</Input.Label>

        <Input.Root withError={!!formState.errors.email}>
          <Input.Prefix>
            <Mail className="h-5 w-5" />
          </Input.Prefix>
          <Input.Control
            id="email"
            placeholder="name@company.com"
            {...register('email')}
          />
        </Input.Root>
        {formState.errors.email && (
          <ErrorField>{formState.errors.email.message}</ErrorField>
        )}
      </div>

      <div className="group space-y-2">
        <Input.Label htmlFor="password">Password</Input.Label>

        <Input.Root withError={!!formState.errors.password}>
          <Input.Prefix>
            <Lock className="h-5 w-5" />
          </Input.Prefix>
          <Input.Control
            className="relative"
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
          />
          <Button
            variant="ghost"
            type="button"
            className="absolute right-2 cursor-pointer p-0 pr-2 text-outline transition-colors hover:text-white"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <EyeClosed className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </Input.Root>
        {formState.errors.password && (
          <ErrorField>{formState.errors.password.message}</ErrorField>
        )}
      </div>

      {isError && (
        <ErrorField className="justify-center">
          Something went wrong. Please check your credentials and try again.
        </ErrorField>
      )}

      <Button className="mx-auto w-full" disabled={isPending}>
        {isPending ? <Loader className="animate-spin" /> : 'Authorize Access'}
      </Button>
    </form>
  );
}

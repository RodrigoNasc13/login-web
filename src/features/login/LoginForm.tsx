import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, Loader, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { ErrorField } from '../../components/ErrorField';
import * as Input from '../../components/input/Index';
import { useLogin } from './api/useLogin';
import { type LoginFormData, loginFormSchema } from './shemas/login-form-shema';

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
    mutate(data);
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit(handleLogin)}>
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
        <div className="flex items-center justify-between px-1">
          <Input.Label htmlFor="password">Password</Input.Label>
          <Link
            to="/"
            className="mb-2 font-medium text-secondary text-sm transition-colors hover:text-primary-dim"
          >
            Forgot your password?
          </Link>
        </div>

        <Input.Root withError={!!formState.errors.password}>
          <Input.Prefix>
            <Lock className="h-5 w-5" />
          </Input.Prefix>
          <Input.Control
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
          />
          <button
            type="button"
            className="cursor-pointer pr-2 text-outline transition-colors hover:text-white"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <EyeClosed className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
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

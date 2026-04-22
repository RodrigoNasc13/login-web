import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Eye, EyeClosed, Loader, Lock, Mail, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { ErrorField } from '../../components/ErrorField';
import * as Input from '../../components/input/Index';
import { useRegister } from './api/use-register';
import {
  type RegisterFormData,
  registerFormSchema,
} from './shemas/register-form-shema';

interface RegisterFormProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RegisterForm({ setIsLogin }: RegisterFormProps) {
  const { register, formState, handleSubmit, watch } =
    useForm<RegisterFormData>({
      resolver: zodResolver(registerFormSchema),
      defaultValues: {
        name: '',
        email: '',
        password: '',
      },
    });

  const { mutate, isPending, isError } = useRegister();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const currentPassword = watch('password') || '';

  const hasUpperCase = /[A-Z]/.test(currentPassword);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(currentPassword);

  function handleRegister(data: RegisterFormData) {
    mutate(data, {
      onSuccess: () => {
        setIsLogin(true);
      },
    });
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
      <div className="group space-y-2">
        <Input.Label htmlFor="name">Name</Input.Label>

        <Input.Root withError={!!formState.errors.name}>
          <Input.Prefix>
            <Mail className="h-5 w-5" />
          </Input.Prefix>
          <Input.Control
            id="name"
            placeholder="Rodrigo Nascimento"
            {...register('name')}
          />
        </Input.Root>
        {formState.errors.name && (
          <ErrorField>{formState.errors.name.message}</ErrorField>
        )}
      </div>

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

        <div className="flex flex-col gap-2 rounded-lg bg-surface-container/50 pt-2 text-sm">
          <span className="font-semibold text-white-variant">
            Password requirements:
          </span>

          <div className="flex flex-col gap-1.5">
            <div
              className={`flex items-center gap-2 ${hasUpperCase ? 'text-green-400' : 'text-outline-variant'}`}
            >
              {hasUpperCase ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              <span>At least 1 uppercase letter</span>
            </div>

            <div
              className={`flex items-center gap-2 ${hasSpecialChar ? 'text-green-400' : 'text-outline-variant'}`}
            >
              {hasSpecialChar ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              <span>At least 1 special character</span>
            </div>
          </div>
        </div>
      </div>

      {isError && (
        <ErrorField className="justify-center">
          Something went wrong. Please check your credentials and try again.
        </ErrorField>
      )}

      <Button className="mx-auto w-full" disabled={isPending}>
        {isPending ? <Loader className="animate-spin" /> : 'Register'}
      </Button>
    </form>
  );
}

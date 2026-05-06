import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Eye, EyeClosed, Loader, Lock, Mail, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Input from '../../components/input/Index';
import { Button } from '../Button';
import { ErrorField } from '../ErrorField';
import {
  type RegisterFormData,
  registerFormSchema,
} from './schemas/register-user-form-schema';

type RegisterUserFormProps = {
  onSubmit: (data: RegisterFormData) => void;
  isPending?: boolean;
  isError?: boolean;
  buttonText?: string;
};

export function RegisterUserForm({
  onSubmit,
  isPending,
  isError,
  buttonText = 'Save',
}: RegisterUserFormProps) {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const currentPassword = form.watch('password') || '';

  const hasUpperCase = /[A-Z]/.test(currentPassword);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(currentPassword);

  return (
    <form
      data-testid="register-user-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="group space-y-2">
        <Input.Label htmlFor="name">Name</Input.Label>

        <Input.Root
          data-testid="register-name-input"
          withError={!!form.formState.errors.name}
        >
          <Input.Prefix>
            <Mail className="h-5 w-5" />
          </Input.Prefix>
          <Input.Control
            id="name"
            placeholder="Rodrigo Nascimento"
            {...form.register('name')}
          />
        </Input.Root>
        {form.formState.errors.name && (
          <ErrorField>{form.formState.errors.name.message}</ErrorField>
        )}
      </div>

      <div className="group space-y-2">
        <Input.Label htmlFor="email">Email address</Input.Label>

        <Input.Root
          data-testid="register-email-input"
          withError={!!form.formState.errors.email}
        >
          <Input.Prefix>
            <Mail className="h-5 w-5" />
          </Input.Prefix>
          <Input.Control
            id="email"
            placeholder="name@company.com"
            {...form.register('email')}
          />
        </Input.Root>
        {form.formState.errors.email && (
          <ErrorField>{form.formState.errors.email.message}</ErrorField>
        )}
      </div>

      <div className="group space-y-2">
        <Input.Label htmlFor="password">Password</Input.Label>

        <Input.Root
          data-testid="register-password-input"
          withError={!!form.formState.errors.password}
        >
          <Input.Prefix>
            <Lock className="h-5 w-5" />
          </Input.Prefix>
          <Input.Control
            className="relative"
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="••••••••"
            {...form.register('password')}
          />
          <Button
            variant="ghost"
            type="button"
            data-testid="register-toggle-password-visibility"
            className="absolute right-2 cursor-pointer p-0 text-outline transition-colors hover:text-white"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <EyeClosed className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </Input.Root>

        {form.formState.errors.password && (
          <ErrorField>{form.formState.errors.password.message}</ErrorField>
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

      <Button
        data-testid="register-button"
        className="mx-auto w-full"
        disabled={isPending}
      >
        {isPending ? <Loader className="animate-spin" /> : buttonText}
      </Button>
    </form>
  );
}

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { User } from '../../types/user';
import { ErrorField } from '../ErrorField';
import * as Input from '../input/Index';
import {
  type EditUserFormData,
  editUserFormSchema,
} from './schemas/edit-user-form-schema';

type EditUserFormProps = {
  onSubmit: (data: EditUserFormData) => void;
  isPending?: boolean;
  isError?: boolean;
  buttonText?: string;
  user: User;
};

export function EditUserForm({ onSubmit, isError, user }: EditUserFormProps) {
  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      name: user.name,
    },
  });

  return (
    <form
      id="edit-user-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="group space-y-2">
        <Input.Label htmlFor="name">Name</Input.Label>

        <Input.Root withError={!!form.formState.errors.name}>
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

      {isError && (
        <ErrorField className="justify-center">
          Something went wrong. Please check your credentials and try again.
        </ErrorField>
      )}
    </form>
  );
}

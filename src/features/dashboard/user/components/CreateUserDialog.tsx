import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../../components/Dialog';
import { RegisterUserForm } from '../../../../components/forms/RegisterUserForm';
import {
  type RegisterFormData,
  registerFormSchema,
} from '../../../../components/forms/schemas/register-user-form-schema';
import { useRegisterUser } from '../../../platform/api/use-register-user';

interface CreateUserDialogProps {
  setIsRegisterDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRegisterDialogOpen: boolean;
}

export function CreateUserDialog({
  setIsRegisterDialogOpen,
  isRegisterDialogOpen,
}: CreateUserDialogProps) {
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
        setIsRegisterDialogOpen(false);

        reset({
          email: '',
          name: '',
          password: '',
        });

        toast.success(`User ${data.user.name} created successfully!`);
      },
    });
  }

  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new user.
          </DialogDescription>
        </DialogHeader>

        <RegisterUserForm
          onSubmit={handleRegister}
          isError={isError}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

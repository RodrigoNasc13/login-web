import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../../components/Dialog';
import { RegisterUserForm } from '../../../../components/forms/RegisterUserForm';
import type { RegisterFormData } from '../../../../components/forms/schemas/register-user-form-schema';
import { useRegisterAdmin } from '../api/use-register-admin';

interface CreateAdminDialogProps {
  setIsRegisterDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRegisterDialogOpen: boolean;
}

export function CreateAdminDialog({
  setIsRegisterDialogOpen,
  isRegisterDialogOpen,
}: CreateAdminDialogProps) {
  const { mutate, isPending, isError } = useRegisterAdmin();

  function handleRegister(data: RegisterFormData) {
    mutate(data, {
      onSuccess: () => {
        setIsRegisterDialogOpen(false);
      },
    });
  }

  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new admin user.
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

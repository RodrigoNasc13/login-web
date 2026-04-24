import { Loader } from 'lucide-react';
import { Button } from '../../../components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/Dialog';
import { EditUserForm } from '../../../components/forms/EditUserForm';
import type { EditUserFormData } from '../../../components/forms/schemas/edit-user-form-schema';
import type { User } from '../../../types/user';
import { useEditUser } from '../api/use-edit-user';

interface EditUserDialogProps {
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditDialogOpen: boolean;
  user: User | null;
}
export function EditUserDialog({
  setIsEditDialogOpen,
  isEditDialogOpen,
  user,
}: EditUserDialogProps) {
  const { mutate, isPending } = useEditUser();

  function handleEditUser(data: EditUserFormData) {
    if (!user) {
      return;
    }

    mutate(
      { userId: user.id, userData: { name: data.name } },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Edit this user&apos;s details and permissions. Changes will take
            effect immediately.
          </DialogDescription>
        </DialogHeader>

        {user && (
          <EditUserForm
            onSubmit={handleEditUser}
            isPending={isPending}
            isError={false}
            user={user}
          />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isPending}
              className="min-w-28 px-6"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            form="edit-user-form"
            disabled={isPending || !user}
            type="submit"
            className="min-w-28 px-6"
          >
            {isPending ? <Loader className="animate-spin" /> : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

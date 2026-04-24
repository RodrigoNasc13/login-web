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
import type { User } from '../../../types/user';
import { useDeleteUser } from '../api/use-delete-user';

interface DeleteUserDialogProps {
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteDialogOpen: boolean;
  user: User | null;
}
export function DeleteUserDialog({
  setIsDeleteDialogOpen,
  isDeleteDialogOpen,
  user,
}: DeleteUserDialogProps) {
  const { mutate, isPending } = useDeleteUser();

  function handleDeleteUser() {
    if (!user) {
      return;
    }

    mutate(user.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  }

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete
            {user ? ` ${user.name}` : ' this user'}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

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
            onClick={handleDeleteUser}
            disabled={isPending || !user}
            type="button"
            className="min-w-28 px-6"
          >
            {isPending ? <Loader className="animate-spin" /> : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

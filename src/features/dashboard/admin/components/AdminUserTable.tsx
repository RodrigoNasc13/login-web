import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '../../../../components/Button';
import { DataTable } from '../../../../components/DataTable';
import type { User } from '../../../../types/user';
import { DeleteUserDialog } from '../../components/DeleteUserDialog';
import { EditUserDialog } from '../../components/EditUserDialog';
import { useGetAdminUsers } from '../api/get-admin-users-list';

interface GetColumnsProps {
  onDelete: (user: User) => void;
  onEdit: (user: User) => void;
}

function getColumns({ onDelete, onEdit }: GetColumnsProps): ColumnDef<User>[] {
  return [
    {
      accessorKey: 'user',
      header: 'User',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-0 bg-default-gray font-bold font-headline text-white">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-white transition-colors hover:text-primary">
                {user.name}
              </div>
              <div className="mt-0.5 text-slate-400 text-xs">{user.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <div className="text-slate-400">{row.getValue('role')}</div>
      ),
    },
    {
      accessorKey: 'active',
      header: 'Active',
      cell: ({ row }) => {
        const isActive = row.getValue('active');

        return (
          <span
            className={
              isActive
                ? 'inline-flex items-center rounded-full bg-[#7dffa1]/10 px-2.5 py-1 font-medium text-[#7dffa1] text-xs'
                : 'inline-flex items-center rounded-full bg-default-gray/50 px-2.5 py-1 font-medium text-slate-400 text-xs'
            }
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              onClick={() => onEdit(user)}
              variant="ghost"
              type="button"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-default-gray hover:text-primary"
            >
              <Edit2 className="h-5 w-5" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              onClick={() => onDelete(user)}
              disabled={user.role !== 'SUPER_ADMIN'}
              variant="ghost"
              type="button"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-default-gray hover:text-red-400"
            >
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        );
      },
    },
  ];
}

export function AdminUserTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenDeleteDialog = useCallback((user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleOpenEditDialog = useCallback((user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  }, []);

  const columns = useMemo(
    () =>
      getColumns({
        onDelete: handleOpenDeleteDialog,
        onEdit: handleOpenEditDialog,
      }),
    [handleOpenDeleteDialog, handleOpenEditDialog],
  );

  const { data, isLoading } = useGetAdminUsers(
    pagination.pageIndex,
    pagination.pageSize,
  );

  function handlePreviousPage() {
    setPagination((previous) => ({
      ...previous,
      pageIndex: Math.max(previous.pageIndex - 1, 0),
    }));
  }

  function handleNextPage() {
    setPagination((previous) => {
      const maxPageIndex = Math.max((data?.totalPages ?? 1) - 1, 0);

      return {
        ...previous,
        pageIndex: Math.min(previous.pageIndex + 1, maxPageIndex),
      };
    });
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.content ?? []}
        isLoading={isLoading}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        totalElements={data?.totalElements ?? 0}
        totalPages={data?.totalPages ?? 0}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />

      <DeleteUserDialog
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        user={selectedUser}
      />

      <EditUserDialog
        setIsEditDialogOpen={setIsEditDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        user={selectedUser}
      />
    </div>
  );
}

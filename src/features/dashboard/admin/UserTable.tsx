import type { ColumnDef } from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import { DataTable } from '../../../components/DataTable';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
};

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    email: 'sarah.j@saving4you.com',
    role: 'Administrator',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'm.chen@saving4you.com',
    role: 'Wealth Advisor',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    email: 'elena.r@saving4you.com',
    role: 'Client Support',
    status: 'Inactive',
  },
];

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const isActive = status === 'Active';
      return (
        <span
          className={
            isActive
              ? 'inline-flex items-center rounded-full bg-[#7dffa1]/10 px-2.5 py-1 font-medium text-[#7dffa1] text-xs'
              : 'inline-flex items-center rounded-full bg-default-gray/50 px-2.5 py-1 font-medium text-slate-400 text-xs'
          }
        >
          {status}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: () => {
      return (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-default-gray hover:text-primary"
          >
            <Edit2 className="h-5 w-5" />
            <span className="sr-only">Edit</span>
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-default-gray hover:text-red-400"
          >
            <Trash2 className="h-5 w-5" />
            <span className="sr-only">Delete</span>
          </button>
        </div>
      );
    },
  },
];

export function UserTable() {
  return <DataTable columns={columns} data={mockUsers} />;
}

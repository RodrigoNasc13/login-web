import { Info, Plus } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button } from '../components/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/Tooltip';
import { CreateUserDialog } from '../features/dashboard/user/components/CreateUserDialog';
import { UserTable } from '../features/dashboard/user/components/UserTable';
import type { OutletContext } from '../types/outlet-context';

export function UserDashboard() {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  const { user } = useOutletContext<OutletContext>();

  return (
    <div className="flex w-full justify-center px-4 py-10 font-body text-white md:px-0">
      <div className="flex w-full max-w-4xl flex-col gap-8 2xl:max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-start justify-center gap-4">
            <h2 className="font-bold font-headline text-3xl text-white tracking-tight sm:text-4xl md:text-5xl">
              User Management
            </h2>

            <Tooltip>
              <TooltipTrigger>
                <Info className="text-secondary" />
              </TooltipTrigger>
              <TooltipContent side="right" className="text-white">
                Manage your user settings, view user statistics, and configure
                permissions.
              </TooltipContent>
            </Tooltip>
          </div>

          <Button
            className="flex transform items-center space-x-2 rounded-full bg-linear-to-br from-primary to-tertiary px-6 py-3 font-bold font-headline text-obsidian shadow-[0_0_20px_-5px_var(--color-primary)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_var(--color-primary)] active:scale-95"
            onClick={() => {
              setIsRegisterDialogOpen(true);
            }}
          >
            <Plus className="h-5 w-5 stroke-[2.5]" />
            <span>Create user</span>
          </Button>
        </div>

        <UserTable loginUser={user} />
      </div>

      <CreateUserDialog
        isRegisterDialogOpen={isRegisterDialogOpen}
        setIsRegisterDialogOpen={setIsRegisterDialogOpen}
      />
    </div>
  );
}

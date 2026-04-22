import { Info, Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/Tooltip';
import { UserTable } from '../features/dashboard/admin/UserTable';

export function AdminDashboard() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-obsidian px-4 font-body text-white md:px-0">
      <main className="relative mx-auto flex max-w-3xl flex-1 flex-col gap-8 overflow-y-auto py-4 md:pt-20 2xl:max-w-7xl">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start justify-center gap-4">
            <h2 className="font-bold font-headline text-3xl text-white tracking-tight sm:text-4xl md:text-5xl">
              Admin Management
            </h2>

            <Tooltip>
              <TooltipTrigger>
                <Info className="text-secondary" />
              </TooltipTrigger>
              <TooltipContent side="right" className="text-white">
                Manage your admin settings, view user statistics, and configure
                permissions.
              </TooltipContent>
            </Tooltip>
          </div>

          <Button className="flex transform items-center space-x-2 rounded-full bg-linear-to-br from-primary to-tertiary px-6 py-3 font-bold font-headline text-obsidian shadow-[0_0_20px_-5px_var(--color-primary)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_var(--color-primary)] active:scale-95">
            <Plus className="h-5 w-5 stroke-[2.5]" />
            <span>Create User</span>
          </Button>
        </div>

        <UserTable />
      </main>
    </div>
  );
}

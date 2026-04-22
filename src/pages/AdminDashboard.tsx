import { Info, Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/Tooltip';
import { UserTable } from '../features/dashboard/admin/UserTable';

export function AdminDashboard() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-obsidian font-body text-white">
      <main className="relative flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-default-gray/50 via-obsidian to-obsidian md:pt-0">
        <div className="mx-auto max-w-7xl p-6 md:p-10 lg:p-12">
          <div className="mb-10 flex flex-col items-start justify-between space-y-6 md:flex-row md:items-center md:space-y-0">
            <div className="flex gap-2">
              <h2 className="mb-2 font-bold font-headline text-3xl text-white tracking-tight sm:text-4xl md:text-5xl">
                Admin Management
              </h2>

              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-secondary" />
                </TooltipTrigger>
                <TooltipContent side="right" className="text-white">
                  Manage your admin settings, view user statistics, and
                  configure permissions.
                </TooltipContent>
              </Tooltip>
            </div>

            <Button className="flex transform items-center space-x-2 rounded-full bg-linear-to-br from-primary to-tertiary px-6 py-3 font-bold font-headline text-obsidian shadow-[0_0_20px_-5px_var(--color-primary)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_var(--color-primary)] active:scale-95">
              <Plus className="h-5 w-5 stroke-[2.5]" />
              <span>Create User</span>
            </Button>
          </div>

          <UserTable />
        </div>
      </main>
    </div>
  );
}

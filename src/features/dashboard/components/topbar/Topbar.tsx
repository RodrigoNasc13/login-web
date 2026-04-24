import { Menu, PiggyBankIcon } from 'lucide-react';
import { useSidebar } from '../../../../components/Sidebar';

export function Topbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-slate-800/60 border-b bg-slate-950 px-4 backdrop-blur-md md:hidden md:px-6">
      <div className="relative flex w-full items-center">
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </button>

        <div className="absolute left-[50%] flex -translate-x-1/2 transform items-center gap-2 md:hidden">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-purple-500/20 bg-purple-500/10">
            <PiggyBankIcon className="h-4 w-4 text-purple-400" />
          </div>
          <h1 className="font-black font-headline text-lg text-purple-400 tracking-tighter">
            Saving<span className="text-white">4</span>You
          </h1>
        </div>
      </div>
    </header>
  );
}

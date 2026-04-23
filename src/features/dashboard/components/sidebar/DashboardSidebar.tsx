import { PiggyBankIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '../../../../components/Sidebar';
import { menuOptions } from './menu-options';

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <Sidebar
      collapsible="icon"
      className="z-40 flex flex-col space-y-8 text-sm"
    >
      <SidebarHeader className="px-6 pt-8 pb-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:pt-6">
        <div className="mb-4 flex items-center justify-between group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-4">
          <div className="flex items-center gap-4 group-data-[collapsible=icon]:justify-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-outline-variant/15 bg-surface-container-high group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8">
              <PiggyBankIcon className="text-purple-400 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <h1 className="font-black font-headline text-2xl leading-none tracking-tighter">
                Saving
                <span className="text-secondary">4You</span>
              </h1>
              <p className="font-label text-slate-500 text-xs">
                Wealth Management
              </p>
            </div>
          </div>

          <SidebarTrigger className="group-data-[collapsible=icon]:mx-auto" />
        </div>
      </SidebarHeader>

      <SidebarContent className="space-y-2 px-4 group-data-[collapsible=icon]:px-2">
        {menuOptions.map((group) => (
          <SidebarGroup
            key={group.groupLabel}
            className="group-data-[collapsible=icon]:p-0"
          >
            <div className="mb-2 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wider group-data-[collapsible=icon]:hidden">
              {group.groupLabel}
            </div>

            <SidebarGroupContent>
              <SidebarMenu className="group-data-[collapsible=icon]:items-center">
                {group.items.map((item) => {
                  const isItemActive = location.pathname === item.path;
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        variant="default"
                        asChild
                        isActive={isItemActive}
                        tooltip={item.label}
                      >
                        <Link
                          to={item.path}
                          className="group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!"
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden">
                            {item.label}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="mt-auto px-6 pb-8 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:pb-4">
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <a
                href="/logout"
                className="group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!"
              >
                <span className="material-symbols-outlined shrink-0 text-[1.25rem]">
                  logout
                </span>
                <span className="group-data-[collapsible=icon]:hidden">
                  Logout
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

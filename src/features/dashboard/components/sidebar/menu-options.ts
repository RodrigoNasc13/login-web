import { type LucideIcon, ShieldUser, Users } from 'lucide-react';

export type MenuOption = {
  label: string;
  path: string;
  icon: LucideIcon;
};

export type MenuGroup = {
  groupLabel: string;
  items: MenuOption[];
};

export const menuOptions: MenuGroup[] = [
  {
    groupLabel: 'Dashboard',
    items: [
      {
        label: 'Admin',
        path: '/dashboard/admin',
        icon: ShieldUser,
      },
      {
        label: 'Users',
        path: '/dashboard/users',
        icon: Users,
      },
    ],
  },
];

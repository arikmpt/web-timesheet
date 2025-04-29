import { CircleGauge, LucideIcon, Shield } from 'lucide-react';
import { useMemo } from 'react';

export interface Menu {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: MenuItem[];
}

interface MenuItem {
  title: string;
  url: string;
}

export default function useMenu() {
  const menus: Menu[] = useMemo(
    () => [
      {
        title: 'Dashboard',
        url: '/',
        icon: CircleGauge,
      },
      {
        title: 'Admin Area',
        url: '/',
        icon: Shield,
        items: [
          {
            title: 'User Management',
            url: '/',
          },
          {
            title: 'Role Management',
            url: '/',
          },
        ],
      },
    ],
    []
  );

  return menus;
}

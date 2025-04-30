'use client';

import { ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '../ui/sidebar';
import { NavUser } from './nav-user';
import useMenu from '@/hooks/use-menu';
import Image from 'next/image';
import logo from '../../../public/logo.jpg';
import { useProfile } from '@/hooks/queries/use-profile';
import { useProfileStore } from '@/lib/store/profile';
import { useEffect } from 'react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const menus = useMenu();
  const { open } = useSidebar();

  const { data, isLoading } = useProfile();
  const { setProfile } = useProfileStore((state) => state);

  useEffect(() => {
    if (data && !isLoading) {
      setProfile(data.profile);
    }
  }, [data, isLoading, setProfile]);

  return (
    <Sidebar collapsible='icon' className='select-none' {...props}>
      <SidebarHeader>
        <div className='flex justify-between'>
          {open && <Image src={logo} alt={''} width={180} height={80} />}
          <SidebarTrigger className='-ml-1' />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((item) => {
                if (item.items && item.items.length > 0) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      className='group/collapsible'
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild className='cursor-pointer'>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className='hover:bg-transparent hover:!text-foreground active:!text-foreground'
                          >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a
                                    href={subItem.url}
                                    className='hover:bg-transparent hover:!text-foreground active:!text-foreground'
                                  >
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                } else {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className='hover:bg-transparent data-[active=true]:!text-foreground data-[active=true]:!bg-transparent hover:!text-foreground active:!text-foreground'
                        tooltip={item.title}
                        asChild
                      >
                        <a href={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

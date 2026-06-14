'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Building, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/invoices', label: 'Invoices', icon: FileText },
  { href: '/dashboard/company', label: 'Company', icon: Building },
  { href: '/dashboard/account', label: 'Account', icon: User },
];

import { useState, useEffect } from 'react';
import { useCompanyList } from '@/features/company/queries/use-company-list';
import { useCompanyStore } from '@/features/company/store/use-company-store';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '../ui/combobox';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { setOpenMobile } = useSidebar();

  const { data: companies, isLoading } = useCompanyList();
  const { selectedCompanyId, setSelectedCompanyId } = useCompanyStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (companies && companies.length > 0 && !selectedCompanyId) {
      setSelectedCompanyId(companies[0].id);
    }
  }, [companies, selectedCompanyId, setSelectedCompanyId]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out successfully');
      router.push('/login');
      router.refresh();
    }
  };

  const selectedCompany = companies?.find((company) => company.id === selectedCompanyId);

  return (
    <ShadcnSidebar collapsible="icon" variant="inset">
      <SidebarHeader className="border-b px-3">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Invoice Builder Logo"
                width={32}
                height={32}
                className="rounded-md border"
              />
              <span className="text-xl font-bold tracking-tight group-data-[collapsible=icon]:hidden">
                Invoice Builder
              </span>
            </div>
            <p className="text-muted-foreground text-[10px] group-data-[collapsible=icon]:hidden">
              Made by{' '}
              <a
                href="https://www.brilliahib.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                brilliahib.dev
              </a>
            </p>
          </div>

          {!isLoading && companies && companies.length > 0 && (
            <div className="group-data-[collapsible=icon]:hidden">
              <Combobox
                value={selectedCompany ? selectedCompany.name : undefined}
                onValueChange={(val) => {
                  if (val) {
                    const company = companies.find((c) => c.name === val);
                    if (company) setSelectedCompanyId(company.id);
                  }
                }}
                items={companies}
              >
                <div className="relative w-full">
                  <ComboboxInput
                    placeholder="Select a company..."
                    className="h-9 w-full pl-8 text-sm"
                    showTrigger={true}
                  />
                  <Building className="text-muted-foreground pointer-events-none absolute top-2.5 left-2.5 h-4 w-4" />
                </div>
                <ComboboxContent className={'w-full!'}>
                  <ComboboxEmpty>No company found.</ComboboxEmpty>
                  <ComboboxList>
                    {companies.map((company) => (
                      <ComboboxItem key={company.id} value={company.name}>
                        <div className="flex items-center gap-2">
                          <Building className="text-muted-foreground h-4 w-4 shrink-0" />
                          <span className="truncate">{company.name}</span>
                        </div>
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="space-y-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.href === '/dashboard'
                    ? pathname === '/dashboard'
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label}
                      onClick={() => setOpenMobile(false)}
                      render={
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span className="text-md">{item.label}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}

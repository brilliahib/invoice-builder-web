import type { ReactNode } from 'react';
import { Sidebar } from '@/components/organisms/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden w-full relative">
          <div className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-8">
            <SidebarTrigger />
            <div className="flex-1" />
          </div>
          <div className="p-4 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

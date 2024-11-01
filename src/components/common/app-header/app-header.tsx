import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumbs } from '../breadcrumbs';
import { UserNav } from '../user-nav';

export const AppHeader = () => {
  return (
    <header className='flex items-center justify-between h-16 shrink-0 px-4 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shadow-sm mb-1'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>
      <div className='flex items-center gap-2 px-4'>
        <UserNav />
      </div>
    </header>
  );
};

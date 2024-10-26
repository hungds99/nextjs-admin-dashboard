import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AccountForm } from './components/account-form';

export default function SettingsAccountPage() {
  return (
    <ScrollArea className='h-[calc(100dvh-52px)]'>
      <div className='h-full p-4 md:px-8'>
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-medium'>Account</h3>
            <p className='text-sm text-muted-foreground'>
              Update your account settings. Set your preferred language and timezone.
            </p>
          </div>
          <Separator />
          <AccountForm />
        </div>
      </div>
    </ScrollArea>
  );
}

import { ScrollArea } from '@/components/ui/scroll-area';

export const AppContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ScrollArea className='h-[calc(100dvh-52px)]'>
      <div className='h-full p-4 md:px-8'>{children}</div>
    </ScrollArea>
  );
};

import { ScrollArea } from '@/components/ui/scroll-area';

export const AppContainer = ({
  children,
  isDetailPage = false,
}: Readonly<{
  children: React.ReactNode;
  isDetailPage?: boolean;
}>) => {
  return (
    <ScrollArea className='h-[calc(100vh-52px)]'>
      <div
        className={`h-full px-4 md:px-8 lg:px-12 xl:px-16 ${
          isDetailPage ? 'max-w-4xl mx-auto' : ''
        }`}
      >
        {children}
      </div>
    </ScrollArea>
  );
};

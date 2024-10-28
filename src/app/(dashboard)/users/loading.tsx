import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='w-full'>
      <Skeleton className='h-1 w-full rounded-full bg-sky-500' />
    </div>
  );
}

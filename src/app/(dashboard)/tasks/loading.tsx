import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex items-center'>
      <Skeleton className='h-12 w-full rounded-full' />
    </div>
  );
}

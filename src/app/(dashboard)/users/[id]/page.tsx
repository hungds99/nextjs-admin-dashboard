import { AppContainer } from '@/components/common/app-container';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import UserForm from './_components/create-form';

export default function User() {
  return (
    <AppContainer>
      <div className='hidden h-full flex-1 flex-col space-y-8 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div className='flex items-center gap-3'>
            <Link href='/users'>
              <ArrowLeft />
            </Link>
            <h2 className='text-3xl font-bold tracking-tight'>Add user</h2>
          </div>
        </div>
        <UserForm />
      </div>
    </AppContainer>
  );
}

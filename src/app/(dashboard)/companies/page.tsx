import { AppContainer } from '@/components/common/app-container';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import { z } from 'zod';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { userSchema } from './data/schema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Users',
  description: 'Manage users in the system.',
};

//

// Simulate a database read for tasks.
async function getUsers() {
  const data = Array.from({ length: 100 }, () => ({
    id: `USER-${Math.floor(Math.random() * 10000)}`,
    name: `User ${Math.floor(Math.random() * 10000)}`,
    image_url: 'https://picsum.photos/200/300',
    email: `email-${Math.floor(Math.random() * 10000)}@example.com`,
    role: ['admin', 'user', 'guest'][Math.floor(Math.random() * 3)],
    status: ['active', 'inactive'][Math.floor(Math.random() * 2)],
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  return z.array(userSchema).parse(data);
}

export default async function Page() {
  const users = await getUsers();

  return (
    <AppContainer>
      <div className='hidden h-full flex-1 flex-col space-y-8 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight'>Companies</h2>
          <div className='flex items-center space-x-2'>
            <Link className={buttonVariants({ variant: 'default' })} href={'/users/new'}>
              <Plus />
              Add User
            </Link>
          </div>
        </div>
        <DataTable data={users} columns={columns} />
      </div>
    </AppContainer>
  );
}

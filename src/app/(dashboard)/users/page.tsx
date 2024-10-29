import { AppContainer } from '@/components/common/app-container';
import { Header } from '@/components/common/header';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { db } from '@/lib/kysely';
import { Users } from '@/types/db';

export const metadata: Metadata = {
  title: 'Users',
  description: 'Manage users in the system.',
};

async function getUsers() {
  let users: Users[] = [];
  try {
    users = (await db.selectFrom('users').execute()) as Users[];
    console.log(users);
  } catch (error) {
    console.error('Error fetching users', error);
  }
  return users as Users[];
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <AppContainer>
      <div className='hidden h-full flex-1 flex-col space-y-4 md:flex'>
        <Header
          title='Users'
          primaryAction={
            <Link href={'/users/new'} className={buttonVariants({ variant: 'default' })}>
              <Plus />
              <span>Add User</span>
            </Link>
          }
        />
        <DataTable data={users} columns={columns} />
      </div>
    </AppContainer>
  );
}

import { getUsers } from '@/actions/user';
import { AppContainer } from '@/components/common/app-container';
import { Header } from '@/components/common/header';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

export const metadata: Metadata = {
  title: 'Users',
  description: 'Manage users in the system.',
};

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

import { getCompanies } from '@/actions/company';
import { AppContainer } from '@/components/common/app-container';
import { Header } from '@/components/common/header';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

export const metadata: Metadata = {
  title: 'Companies',
  description: 'Manage companies in the system.',
};

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <AppContainer>
      <div className='hidden h-full flex-1 flex-col space-y-4 md:flex'>
        <Header
          title='Companies'
          primaryAction={
            <Link href={'/companies/new'} className={buttonVariants({ variant: 'default' })}>
              <Plus />
              <span>Add Company</span>
            </Link>
          }
        />
        <DataTable data={companies} columns={columns} />
      </div>
    </AppContainer>
  );
}

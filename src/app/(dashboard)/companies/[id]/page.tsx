import { getCompany } from '@/actions/company';
import { AppContainer } from '@/components/common/app-container';
import { Header } from '@/components/common/header';
import CompanyForm from './_components/company-form';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  const company = await getCompany(id);

  if (!company) {
    return notFound();
  }

  return (
    <AppContainer isDetailPage>
      <div className='h-full flex-1 flex-col space-y-4 md:flex'>
        <Header title={id === 'new' ? 'Add company' : company?.name} backLink='/companies' />
        <CompanyForm company={company} />
      </div>
    </AppContainer>
  );
}

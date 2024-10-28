import { AppContainer } from '@/components/common/app-container';
import { Header } from '@/components/common/header';
import CompanyForm from './_components/company-form';

export default function User() {
  return (
    <AppContainer>
      <div className='hidden h-full flex-1 flex-col space-y-8 md:flex'>
        <Header title='Add company' backLink='/companies' />
        <CompanyForm />
      </div>
    </AppContainer>
  );
}

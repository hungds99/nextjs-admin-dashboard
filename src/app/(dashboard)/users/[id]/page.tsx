import { AppContainer } from '@/components/common/app-container';
import { Header } from '@/components/common/header';
import UserForm from './_components/user-form';

export default function UserPage() {
  return (
    <AppContainer>
      <div className='hidden h-full flex-1 flex-col space-y-4 md:flex'>
        <Header title='Add user' backLink='/users' />
        <UserForm />
      </div>
    </AppContainer>
  );
}

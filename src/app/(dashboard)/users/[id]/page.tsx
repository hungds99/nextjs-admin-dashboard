import { getUser } from '@/actions/user';
import { AppContainer } from '@/components/common/app-container';
import { Header } from '@/components/common/header';
import { notFound } from 'next/navigation';
import UserForm from './_components/user-form';

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  const user = await getUser(id);

  if (!user) {
    return notFound();
  }

  return (
    <AppContainer isDetailPage>
      <div className='h-full flex-1 flex-col space-y-4 md:flex'>
        <Header title={id === 'new' ? 'Add user' : user?.name} backLink='/users' />
        <UserForm user={user} />
      </div>
    </AppContainer>
  );
}

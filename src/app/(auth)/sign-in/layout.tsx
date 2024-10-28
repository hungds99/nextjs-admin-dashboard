import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account to access the dashboard.',
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='flex h-screen w-full items-center justify-center px-4'>{children}</div>;
}

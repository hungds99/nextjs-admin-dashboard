import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create an account to get started.',
};

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='flex h-screen w-full items-center justify-center px-4'> {children}</div>;
}

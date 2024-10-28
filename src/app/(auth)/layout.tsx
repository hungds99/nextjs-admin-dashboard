'use client';

import { auth } from '@/lib/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        router.push('/'); // Redirect to dashboard if authenticated
      } else {
        setIsAuthenticated(false);
        router.push('/sign-in'); // Redirect to sign-in page if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}

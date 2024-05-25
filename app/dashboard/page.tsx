'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'admin') {
        router.push('/admin');
      } else if (session?.user?.role === 'editor') {
        router.push('/editor');
      } else {
        router.push('/');
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return null; // The redirection will handle the display
}

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ProtectedRoute({ children, roles }: { children: React.ReactNode, roles: string[] }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
    } else if (roles && !roles.includes(session.user.role)) {
      router.push('/');
    }
  }, [session, status, router, roles]);

  if (status === 'loading' || !session || (roles && !roles.includes(session.user.role))) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

// export default ProtectedRoute;

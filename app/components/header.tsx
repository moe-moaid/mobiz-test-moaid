'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoginBtn from './loginBtn';
import Link from 'next/link';

const Header = () => {
  const path = usePathname();
  const { data: session, status } = useSession();

  const getLinkClass = (path: string) => {
    return path === usePathname() ? 'bg-blue-500 text-white' : '';
  };

  return (
    <div className=''>
      <div className='flex flex-row justify-center items-center space-x-4 bg-transparent py-5'>
        <Link href={'/'}>
          <button className={`border border-gray-300 rounded-lg px-3 py-2 ${getLinkClass('/')}`}>Home</button>
        </Link>
        <LoginBtn />
        {/* Conditionally render the new button based on the user's role */}
        {session && session.user && (
          session.user.role === 'viewer' ? (
            <button className="border border-gray-300 rounded-lg px-3 py-2">
              {session.user.name}
            </button>
          ) : (
            <Link href={`/${session.user.role}`}>
              <button className={`border border-gray-300 rounded-lg px-3 py-2 ${getLinkClass(`/${session.user.role}`)}`}>
                Dashboard
              </button>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Header;


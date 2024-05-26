"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginBtn() {
  const { data: session, status } = useSession();
  console.log(session);
  
  const path = usePathname();
  return (
    <>
      {session && (
        <button
          className="px-3 py-2 rounded-lg border border-gray-300 outline-none sroke-none"
          onClick={() => {

            signOut({ callbackUrl: '/login' }

            )
          }}
        >
          Logout
        </button>
      )}
      {!session && (
        <Link href={'/login'} passHref>
        <button
          className={`px-3 py-2 rounded-lg border border-gray-300 outline-none sroke-none ${path === '/login' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
         Login 
        </button>
        </Link>
      )}
    </>
  );
}

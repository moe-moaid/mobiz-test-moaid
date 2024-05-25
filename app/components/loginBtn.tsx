"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function LoginBtn() {
  const { data: session, status } = useSession();
  return (
    <>
      {session && (
        <button
          className="bg-yellow-500 px-3 py-2 rounded-full outline-none sroke-none text-white font-semibold"
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
          className="bg-yellow-500 px-3 py-2 rounded-full outline-none sroke-none text-white font-semibold"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
         Login 
        </button>
        </Link>
      )}
    </>
  );
}

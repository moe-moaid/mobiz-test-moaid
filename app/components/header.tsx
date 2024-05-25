import React from 'react'
import { authOptions } from "@/auth";
import { getServerSession } from 'next-auth';
import LoginBtn from './loginBtn';
export default async function Header() {
    const session = await getServerSession(authOptions);
    console.log('this is my session:: ', session);
    
  return (
    <div>
        <LoginBtn />
    </div>
  )
}


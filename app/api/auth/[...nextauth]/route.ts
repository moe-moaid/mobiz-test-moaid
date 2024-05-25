
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from 'next-auth';
import { authOptions } from '@/auth';

// const users = [
//   { id: 1, username: 'ali', email: 'ali@gmail.com', role: 'admin', password: '123' },
//   { id: 2, username: 'usama', email: 'usama@gmail.com', role: 'editor', password: '123' },
//   { id: 3, username: 'asad', email: 'asad@gmail.com', role: 'viewer', password: '123' },
// ];

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize(credentials, req) {
//         const user = users.find(user => (user.email === credentials?.email) && (user.password === credentials?.password));
//         if (user) {
//           console.log('correct login:: ', user);
//           return user as User;
//         }
//         console.log('failed login:: ');
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id as number;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id as number;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/login',
//   },
// };

// export default NextAuth(authOptions);



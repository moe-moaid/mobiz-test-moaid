import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./components/client-wrapper";
import  SessionProvider  from "./components/client-sessionProvider";
import ClientProviders from "./components/client-sessionProvider";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProviders>
    <html lang="en">
      <body className={inter.className}>
        {/* <SessionProvider> */}
          <ClientWrapper>
            <Header />
            {children}
          </ClientWrapper>
        {/* </SessionProvider> */}
      </body>
    </html>
    </ClientProviders>
  );
}

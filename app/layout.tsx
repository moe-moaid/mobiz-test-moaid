import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./components/client-wrapper";
import ClientProviders from "./components/client-sessionProvider";
import Header from "./components/header";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mobiz Test Website",
  description:
    "Next.js application for interacting with APIs and manage different user roles",
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
            <ThemeProvider enableSystem={true} attribute="class">
              <Header />
              {children}
            </ThemeProvider>
          </ClientWrapper>
          {/* </SessionProvider> */}
        </body>
      </html>
    </ClientProviders>
  );
}

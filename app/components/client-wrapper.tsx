'use client';

import { GlobalProvider } from '../../context/globalContext';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      {children}
    </GlobalProvider>
  );
}

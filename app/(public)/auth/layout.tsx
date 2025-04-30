'use client';

import { routes } from '@/constants/routes';
import { useAuthStore } from '@/lib/store/auth';
import { useEffect } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!!token) {
      window.location.href = routes.ROOT;
    }
  }, [token]);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-5'>
      <div className='flex flex-col gap-2'>{children}</div>
    </div>
  );
}

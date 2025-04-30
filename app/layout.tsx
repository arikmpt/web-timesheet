import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/query-provider';
import { Toaster } from '@/components/ui/sonner';

const robotoSans = Roboto({
  variable: '--font-roboto-sains',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster
            toastOptions={{
              unstyled: false,
              classNames: {
                error: '!bg-destructive !text-white !border-0',
                success: '!bg-green-600 !text-white !border-0',
                description: '!text-white',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}

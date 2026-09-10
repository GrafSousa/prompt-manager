import '@/styles/globals.css';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { PromptSidebar } from '@/components/prompts/sidebar';

import { Providers } from './providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Prompt Manager',
  description: 'Gerencie seus prompts',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} flex antialiased h-screen bg-background text-white`}
      >
        <Providers>
          <PromptSidebar />
          <main className="w-full">{children}</main>

          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}

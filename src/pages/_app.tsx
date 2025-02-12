import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Component {...pageProps} />
        <Analytics />
      </div>
    </ThemeProvider>
  );
}

export default MyApp; 
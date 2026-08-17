import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sandeep Bhargav | React & Full-Stack Developer',
  description: 'Portfolio of Sandeep Bhargav, a React and Full-Stack Developer building scalable, modern web applications.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning>{children}</body></html>;
}

import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-seven-ivory-88.vercel.app'),
  title: {
    default: 'Sandeep Bhargav | React & Full-Stack Developer',
    template: '%s | Sandeep Bhargav',
  },
  description: 'Portfolio of Sandeep Bhargav, a React and Full-Stack Developer building scalable, modern web applications. Expert in Next.js, TypeScript, and Node.js.',
  keywords: [
    'Frontend Developer', 'React Developer', 'Next.js Developer', 
    'TypeScript Developer', 'Full-Stack Developer', 'Sandeep Bhargav', 
    'Web Developer', 'Software Engineer', 'Portfolio', 'Hyderabad', 'India'
  ],
  authors: [{ name: 'Sandeep Bhargav', url: 'https://portfolio-seven-ivory-88.vercel.app' }],
  creator: 'Sandeep Bhargav',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-seven-ivory-88.vercel.app',
    title: 'Sandeep Bhargav | React & Full-Stack Developer',
    description: 'Portfolio of Sandeep Bhargav, a React and Full-Stack Developer building scalable, modern web applications.',
    siteName: 'Sandeep Bhargav Portfolio',
    images: [
      {
        url: '/images/sandeep-portrait.png', // Fallback OpenGraph image
        width: 1200,
        height: 630,
        alt: 'Sandeep Bhargav - Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandeep Bhargav | React & Full-Stack Developer',
    description: 'Portfolio of Sandeep Bhargav, a React and Full-Stack Developer building scalable, modern web applications.',
    images: ['/images/sandeep-portrait.png'],
    creator: '@sandeepbhargav',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://portfolio-seven-ivory-88.vercel.app',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

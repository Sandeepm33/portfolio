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
    default: 'Sandeep Bhargav | React Developer Portfolio',
    template: '%s | Sandeep Bhargav',
  },
  icons: {
    icon: [
      { url: '/images/sb.png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/images/sb.png' },
    ],
    shortcut: ['/images/sb.png'],
  },
  description: "Explore Sandeep Bhargav's developer portfolio featuring React.js, Next.js, TypeScript, responsive web applications, and frontend projects.",
  keywords: [
    'Frontend Developer', 'React Developer', 'Next.js Developer', 
    'TypeScript Developer', 'Full-Stack Developer', 'Sandeep Bhargav', 
    'Web Developer', 'Software Engineer', 'Portfolio', 'Hyderabad', 'India'
  ],
  authors: [{ name: 'Sandeep Bhargav', url: 'https://portfolio-seven-ivory-88.vercel.app/' }],
  creator: 'Sandeep Bhargav',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-seven-ivory-88.vercel.app/',
    title: 'Sandeep Bhargav | React Developer',
    description: 'Explore my frontend development skills and projects built with React.js, Next.js, and TypeScript.',
    siteName: 'Sandeep Bhargav Portfolio',
    images: [
      {
        url: 'https://portfolio-seven-ivory-88.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sandeep Bhargav - React Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandeep Bhargav | React Developer',
    description: 'Explore my frontend development skills and projects built with React.js, Next.js, and TypeScript.',
    images: ['https://portfolio-seven-ivory-88.vercel.app/og-image.png'],
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
    canonical: 'https://portfolio-seven-ivory-88.vercel.app/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sandeep Bhargav',
  url: 'https://portfolio-seven-ivory-88.vercel.app/',
  jobTitle: 'Frontend Developer',
  knowsAbout: [
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Responsive Web Development',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

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
    default: 'Sandeep Bhargav | React & Frontend Developer Portfolio',
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
  description: "Explore Sandeep Bhargav's frontend developer portfolio featuring React.js, Next.js, TypeScript, responsive web development, and real-world projects.",
  keywords: [
    'React Developer', 'Frontend Developer', 'Next.js Developer',
    'TypeScript Developer', 'React.js Developer', 'JavaScript ES6+',
    'React Hooks', 'Redux', 'Tailwind CSS', 'REST API Integration',
    'Responsive Web Design', 'HTML5', 'CSS3', 'Sandeep Bhargav',
    'Frontend Developer in Hyderabad', 'React developer portfolio',
    'Hyderabad', 'India'
  ],
  authors: [{ name: 'Sandeep Bhargav', url: 'https://portfolio-seven-ivory-88.vercel.app/' }],
  creator: 'Sandeep Bhargav',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-seven-ivory-88.vercel.app/',
    title: 'Sandeep Bhargav | React & Frontend Developer',
    description: 'Discover React.js, Next.js, and TypeScript projects by Sandeep Bhargav, a frontend developer.',
    siteName: 'Sandeep Bhargav Portfolio',
    images: [
      {
        url: 'https://portfolio-seven-ivory-88.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sandeep Bhargav - React & Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandeep Bhargav | React & Frontend Developer',
    description: 'Discover React.js, Next.js, and TypeScript projects by Sandeep Bhargav, a frontend developer.',
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
  jobTitle: 'React & Frontend Developer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressCountry: 'India',
  },
  knowsAbout: [
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript ES6+',
    'React Hooks',
    'Redux',
    'Tailwind CSS',
    'REST API Integration',
    'Responsive Web Design',
    'HTML5',
    'CSS3',
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

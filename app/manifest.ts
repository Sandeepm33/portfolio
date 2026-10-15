import { MetadataRoute } from 'next';
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sandeep Bhargav Portfolio',
    short_name: 'Sandeep.Dev',
    description: 'Portfolio of Sandeep Bhargav, a React and Full-Stack Developer',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/images/sb.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}

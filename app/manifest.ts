import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Enzo - AI Project Management for Young Creators',
    short_name: 'Enzo',
    description: 'AI-powered project management platform for young creators to collaborate, manage tasks, and grow together.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#7f00ff',
    icons: [
      {
        src: '/ui/enzo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}

import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Fomi Canvas — Iteration-First Studio Workspace',
  description:
    'Professional AI content generation workspace for creators, designers, and filmmakers. Text to image, spatial iteration trees, and fine artistic control.',
  keywords: ['AI Generation', 'Text to Image', 'Fomi Art', 'Next.js 14', 'Creative Studio', 'Spatial Canvas'],
  authors: [{ name: 'Fomi Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

/**
 * Root Layout Component
 * Configures professional DM Sans & JetBrains Mono typography,
 * light theme palette, and accessible keyboard skip link.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-base-bg text-content-primary font-sans antialiased selection:bg-accent selection:text-white flex flex-col">
        {/* Accessibility skip-to-content anchor */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-btn focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-white"
        >
          Skip to main workspace
        </a>
        <div className="flex-1 flex flex-col w-full">{children}</div>
      </body>
    </html>
  );
}

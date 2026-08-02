import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Municipality of Umingan | Official Government Portal',
  description: 'Official Municipal Portal of Umingan, Pangasinan featuring public updates, e-government services, tourism guide, emergency alerts, and AI citizen assistance.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

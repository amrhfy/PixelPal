import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/shared/Navbar';
import { Poppins } from "next/font/google";
import "./globals.css";
import PageTransition from '@/components/shared/PageTransition';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <AuthProvider>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
        </AuthProvider>
      </body>
    </html>
  );
}

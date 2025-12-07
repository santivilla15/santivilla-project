import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santivilla - Ranking por una Causa",
  description: "Paga para subir en el ranking. El 70% de todo lo recaudado se dona a refugios de animales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        {/* Navegación principal */}
        <nav className="border-b border-green-500/20 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors">
                SANTIVILLA
              </Link>
              <div className="flex gap-6">
                <Link 
                  href="/" 
                  className="text-white hover:text-green-400 transition-colors font-medium"
                >
                  Inicio
                </Link>
                <Link 
                  href="/ranking" 
                  className="text-white hover:text-green-400 transition-colors font-medium"
                >
                  Ranking
                </Link>
                <Link 
                  href="/impacto" 
                  className="text-white hover:text-green-400 transition-colors font-medium"
                >
                  Transparencia
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Contenido principal */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-green-500/20 mt-16 py-8">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© 2024 Santivilla. El ~95% de los ingresos se dona a refugios de animales.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

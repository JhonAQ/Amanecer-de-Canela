import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
});

const playfair = Playfair_Display({
  weight: ['700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Amanecer de Canela - Únete a nuestro equipo",
  description: "Portal de reclutamiento de Amanecer de Canela. Descubre oportunidades de carrera en nuestra panadería.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${playfair.variable}`}>
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

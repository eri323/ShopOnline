import type { Metadata, Viewport } from 'next';
import { Allura, Karla, Marcellus } from 'next/font/google';
import './globals.css';

const marcellus = Marcellus({ subsets: ['latin'], weight: '400', variable: '--font-marcellus', display: 'swap' });
const karla = Karla({ subsets: ['latin'], variable: '--font-karla', display: 'swap' });
const allura = Allura({ subsets: ['latin'], weight: '400', variable: '--font-allura', display: 'swap' });

const DESCRIPCION = 'Ropa americana y nacional para mujer. Tienda virtual desde Medellín, envíos a toda Colombia.';

export const metadata: Metadata = {
  title: 'Caprichos Boutique · Tienda online',
  description: DESCRIPCION,
  // Demo con fotos de la tienda: no debe salir en buscadores.
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Caprichos Boutique · Tienda online',
    description: DESCRIPCION,
    siteName: 'Caprichos Boutique',
    locale: 'es_CO',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F6F1EC',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${marcellus.variable} ${karla.variable} ${allura.variable}`}>
      <body>{children}</body>
    </html>
  );
}

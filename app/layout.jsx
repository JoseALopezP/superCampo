import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navigation } from "@/components/Navigation";

export const metadata = {
  title: "Super Campo - Semillas Certificadas",
  description: "Venta de semillas agrícolas de alta calidad en Argentina.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}

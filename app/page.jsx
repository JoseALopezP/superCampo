import { Hero } from '@/components/Hero';
import { ProductCarousel } from '@/components/ProductCarousel';
import { About } from '@/components/About';
import { Coverage } from '@/components/Coverage';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main id="inicio">
        <Hero />
        <ProductCarousel />
        <About />
        <Coverage />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

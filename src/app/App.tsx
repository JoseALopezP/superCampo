import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCarousel } from './components/ProductCarousel';
import { About } from './components/About';
import { Coverage } from './components/Coverage';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="inicio">
        <Hero />
        <ProductCarousel />
        <About />
        <Coverage />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

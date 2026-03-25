import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sprout } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1633024291242-ca3a2bda4f9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGZpZWxkJTIwYXJnZW50aW5hJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3NDQ3MTMxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Campo argentino"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <div className="flex items-center justify-center mb-6">
          <Sprout className="w-16 h-16 text-amber-400" />
        </div>
        <h1 className="text-6xl mb-6 text-white font-serif">Super Campo</h1>
        <p className="text-2xl mb-8 text-amber-100">Semillas de Calidad para Todo el País</p>
        <p className="text-xl max-w-2xl mx-auto text-gray-200">
          Más de 30 años sembrando futuro en Argentina. Proveedor confiable de semillas certificadas
          para productores de todo el territorio nacional.
        </p>
      </div>
    </section>
  );
}

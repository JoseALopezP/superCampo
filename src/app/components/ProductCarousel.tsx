import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Wheat, Leaf, Sun, Trees } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Semillas de Trigo',
    description: 'Variedades de alto rendimiento adaptadas al clima argentino',
    image: 'https://images.unsplash.com/photo-1683248892987-7b6181dfd718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMHNlZWRzJTIwZ3JhaW58ZW58MXx8fHwxNzc0NDcxMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Wheat,
  },
  {
    id: 2,
    name: 'Semillas de Maíz',
    description: 'Híbridos certificados con excelente sanidad',
    image: 'https://images.unsplash.com/photo-1635843107983-264f83647ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwc2VlZHMlMjBzb3liZWFufGVufDF8fHx8MTc3NDQ3MTMxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Leaf,
  },
  {
    id: 3,
    name: 'Semillas de Girasol',
    description: 'Alta concentración de aceite y resistencia a enfermedades',
    image: 'https://images.unsplash.com/photo-1715865989413-d69314ac1902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5mbG93ZXIlMjBzZWVkcyUyMGFncmljdWx0dXJhbHxlbnwxfHx8fDE3NzQ0NzEzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Sun,
  },
  {
    id: 4,
    name: 'Semillas de Soja',
    description: 'Genética de última generación para máxima productividad',
    image: 'https://images.unsplash.com/photo-1592864554447-5e40d96e2b21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBob2xkaW5nJTIwc2VlZHN8ZW58MXx8fHwxNzc0NDcxMzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Trees,
  },
];

export function ProductCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="productos" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4 text-emerald-900 font-serif">Nuestros Productos</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Semillas certificadas de la más alta calidad, seleccionadas especialmente para el suelo argentino
          </p>
        </div>

        <Slider {...settings}>
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div key={product.id} className="px-3">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-amber-200 hover:shadow-xl transition-shadow">
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-800 p-3 rounded-full">
                      <Icon className="w-6 h-6 text-amber-300" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl mb-3 text-emerald-900">{product.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    <button className="mt-4 w-full bg-emerald-700 text-white py-3 rounded hover:bg-emerald-800 transition-colors">
                      Más Información
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}

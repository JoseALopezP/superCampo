import { ImageWithFallback } from './figma/ImageWithFallback';
import { Award, Users, TrendingUp, Heart } from 'lucide-react';

export function About() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl mb-6 text-emerald-900 font-serif">Sobre Super Campo</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Desde 1992, <strong>Super Campo</strong> ha sido sinónimo de confianza y calidad en el mercado 
              de semillas agrícolas argentino. Fundada por Don papa del Chiqui, nuestra empresa familiar 
              se ha dedicado a proveer a los productores del país con las mejores semillas certificadas.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Con más de tres décadas de experiencia, entendemos las necesidades del campo argentino. 
              Nuestro compromiso es ofrecer productos de excelencia que garanticen cosechas abundantes 
              y rentables para nuestros clientes.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-4 border-amber-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-6 h-6 text-emerald-700" />
                  <h3 className="text-xl text-emerald-900">Calidad</h3>
                </div>
                <p className="text-gray-600">Semillas certificadas y controladas</p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-emerald-700" />
                  <h3 className="text-xl text-emerald-900">Confianza</h3>
                </div>
                <p className="text-gray-600">30+ años en el mercado</p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-6 h-6 text-emerald-700" />
                  <h3 className="text-xl text-emerald-900">Innovación</h3>
                </div>
                <p className="text-gray-600">Tecnología de punta</p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-6 h-6 text-emerald-700" />
                  <h3 className="text-xl text-emerald-900">Compromiso</h3>
                </div>
                <p className="text-gray-600">Con el productor argentino</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl border-8 border-amber-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1669506920388-83fe607aef87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmdlbnRpbmElMjBjYW1wbyUyMGZhcm1sYW5kfGVufDF8fHx8MTc3NDQ3MTMxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Campo argentino"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-emerald-800 text-white p-8 rounded-lg shadow-xl max-w-xs">
              <p className="text-4xl mb-2">30+</p>
              <p className="text-lg">Años sembrando futuro en Argentina</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

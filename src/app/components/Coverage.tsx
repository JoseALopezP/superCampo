import { MapPin, Truck, Package, CheckCircle } from 'lucide-react';

const regions = [
  { name: 'Buenos Aires', coverage: '100%' },
  { name: 'Córdoba', coverage: '100%' },
  { name: 'Santa Fe', coverage: '100%' },
  { name: 'Entre Ríos', coverage: '100%' },
  { name: 'La Pampa', coverage: '100%' },
  { name: 'San Luis', coverage: '95%' },
  { name: 'Mendoza', coverage: '90%' },
  { name: 'Tucumán', coverage: '90%' },
  { name: 'Salta', coverage: '85%' },
  { name: 'Santiago del Estero', coverage: '85%' },
  { name: 'Chaco', coverage: '80%' },
  { name: 'Resto del País', coverage: '75%' },
];

export function Coverage() {
  return (
    <section id="cobertura" className="py-20 bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4 text-white font-serif">Cobertura Nacional</h2>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Llegamos a todo el territorio argentino con la mejor logística y servicio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-emerald-800 p-8 rounded-lg text-center border-2 border-amber-400">
            <div className="flex justify-center mb-4">
              <Truck className="w-12 h-12 text-amber-300" />
            </div>
            <h3 className="text-2xl mb-3 text-white">Envío a Domicilio</h3>
            <p className="text-amber-100">
              Entregamos en tu campo o establecimiento con nuestra flota propia
            </p>
          </div>
          
          <div className="bg-emerald-800 p-8 rounded-lg text-center border-2 border-amber-400">
            <div className="flex justify-center mb-4">
              <Package className="w-12 h-12 text-amber-300" />
            </div>
            <h3 className="text-2xl mb-3 text-white">Puntos de Retiro</h3>
            <p className="text-amber-100">
              Más de 150 puntos de retiro en todo el país para tu comodidad
            </p>
          </div>
          
          <div className="bg-emerald-800 p-8 rounded-lg text-center border-2 border-amber-400">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-amber-300" />
            </div>
            <h3 className="text-2xl mb-3 text-white">Garantía Total</h3>
            <p className="text-amber-100">
              Todas nuestras semillas están certificadas y con garantía de calidad
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-3xl mb-8 text-center text-white font-serif">
            Provincias donde Operamos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {regions.map((region, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                <MapPin className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white">{region.name}</p>
                  <p className="text-sm text-amber-200">Cobertura: {region.coverage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

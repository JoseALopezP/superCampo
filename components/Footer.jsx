import { Sprout, Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-emerald-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Sprout className="w-8 h-8 text-amber-400" />
              <div>
                <h3 className="text-xl text-white font-serif">Super Campo</h3>
                <p className="text-sm text-amber-200">Semillas Certificadas</p>
              </div>
            </div>
            <p className="text-amber-100 text-sm leading-relaxed">
              Sembrando futuro en Argentina desde 1992. Calidad y confianza en cada semilla.
            </p>
          </div>

          <div>
            <h4 className="text-lg mb-4 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-amber-100">
              <li><a href="#inicio" className="hover:text-amber-300 transition-colors">Inicio</a></li>
              <li><a href="#productos" className="hover:text-amber-300 transition-colors">Productos</a></li>
              <li><a href="#nosotros" className="hover:text-amber-300 transition-colors">Nosotros</a></li>
              <li><a href="#cobertura" className="hover:text-amber-300 transition-colors">Cobertura</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-4 text-white">Productos</h4>
            <ul className="space-y-2 text-amber-100">
              <li>Semillas de Trigo</li>
              <li>Semillas de Maíz</li>
              <li>Semillas de Girasol</li>
              <li>Semillas de Soja</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-4 text-white">Seguinos</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-emerald-800 p-3 rounded-full hover:bg-emerald-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-emerald-800 p-3 rounded-full hover:bg-emerald-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-emerald-800 p-3 rounded-full hover:bg-emerald-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-amber-100 text-sm">0800-555-CAMPO</p>
              <p className="text-amber-100 text-sm">info@supercampo.com.ar</p>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-800 pt-8 text-center text-amber-100 text-sm">
          <p>© 2026 Super Campo. Todos los derechos reservados.</p>
          <p className="mt-2">Semillas certificadas • Calidad garantizada • Servicio en todo el país</p>
        </div>
      </div>
    </footer>
  );
}

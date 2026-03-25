import { Sprout, Phone, Mail } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-emerald-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="w-10 h-10 text-amber-400" />
            <div>
              <h1 className="text-2xl text-white font-serif">Super Campo</h1>
              <p className="text-sm text-amber-200">Semillas Certificadas</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="hover:text-amber-300 transition-colors">Inicio</a>
            <a href="#productos" className="hover:text-amber-300 transition-colors">Productos</a>
            <a href="#nosotros" className="hover:text-amber-300 transition-colors">Nosotros</a>
            <a href="#cobertura" className="hover:text-amber-300 transition-colors">Cobertura</a>
            <a href="#contacto" className="hover:text-amber-300 transition-colors">Contacto</a>
          </nav>
          
          <div className="hidden lg:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+54 11 4567-8900</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>info@supercampo.com.ar</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

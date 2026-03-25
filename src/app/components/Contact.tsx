import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4 text-emerald-900 font-serif">Contacto</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Estamos a tu disposición para asesorarte en la mejor elección de semillas para tu campo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-700 p-4 rounded-lg">
                <Phone className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-emerald-900">Teléfono</h3>
                <p className="text-gray-700 text-lg">+54 11 4567-8900</p>
                <p className="text-gray-700 text-lg">0800-555-CAMPO (22676)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-emerald-700 p-4 rounded-lg">
                <Mail className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-emerald-900">Email</h3>
                <p className="text-gray-700 text-lg">info@supercampo.com.ar</p>
                <p className="text-gray-700 text-lg">ventas@supercampo.com.ar</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-emerald-700 p-4 rounded-lg">
                <MapPin className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-emerald-900">Dirección</h3>
                <p className="text-gray-700 text-lg">Ruta Nacional 9, Km 745</p>
                <p className="text-gray-700 text-lg">Rosario, Santa Fe - Argentina</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-emerald-700 p-4 rounded-lg">
                <Clock className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-emerald-900">Horarios</h3>
                <p className="text-gray-700 text-lg">Lunes a Viernes: 8:00 - 18:00</p>
                <p className="text-gray-700 text-lg">Sábados: 8:00 - 13:00</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-amber-200">
            <h3 className="text-2xl mb-6 text-emerald-900">Solicitar Información</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                  placeholder="+54 11 1234-5678"
                />
              </div>

              <div>
                <label htmlFor="province" className="block text-gray-700 mb-2">
                  Provincia
                </label>
                <select
                  id="province"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                >
                  <option>Seleccionar provincia</option>
                  <option>Buenos Aires</option>
                  <option>Córdoba</option>
                  <option>Santa Fe</option>
                  <option>Entre Ríos</option>
                  <option>La Pampa</option>
                  <option>Otra</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 text-white py-4 rounded-lg hover:bg-emerald-800 transition-colors text-lg"
              >
                Enviar Consulta
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

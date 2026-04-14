import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await updateProduct(editingId, formData, imageFile || undefined);
        setEditingId(null);
      } else {
        await addProduct(formData, imageFile || undefined);
        setIsAdding(false);
      }
      setFormData({ name: '', description: '', price: 0, stock: 0, image: '' });
      setImageFile(null);
    } catch (error) {
      alert('Error al guardar el producto. Verifica la configuración de Firebase.');
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setImageFile(null);
    setFormData({ name: '', description: '', price: 0, stock: 0, image: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl mb-2 text-emerald-900 font-serif">Control de Stock</h1>
            <p className="text-xl text-gray-700">
              Gestiona el inventario de productos disponibles
            </p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-emerald-700 text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-emerald-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Agregar Producto
          </button>
        </div>

        <div className="mb-8 bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Nota:</strong> Si ves este mensaje y los cambios no se guardan entre sesiones,
            es porque Firebase no está configurado. Ver archivo <code className="bg-white px-2 py-1 rounded text-xs">FIREBASE_CONFIG.md</code> para instrucciones.
          </p>
        </div>

        {(isAdding || editingId !== null) && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-2 border-emerald-200">
            <h2 className="text-2xl text-emerald-900 font-serif mb-6">
              {editingId !== null ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500 h-24 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Precio (ARS)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: parseFloat(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
                    required
                    min="0"
                    step="100"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">Stock (bolsas)</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
                    required
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Imagen del Producto</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Subir archivo (Firebase Storage)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          setFormData({ ...formData, image: URL.createObjectURL(file) });
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-xs text-gray-500">o</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">URL de imagen</label>
                    <input
                      type="url"
                      value={imageFile ? '' : formData.image}
                      onChange={(e) => {
                        setImageFile(null);
                        setFormData({ ...formData, image: e.target.value });
                      }}
                      disabled={!!imageFile}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500 disabled:bg-gray-100"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-700 mb-2">Vista previa:</p>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-700 text-white py-3 rounded flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {editingId !== null ? 'Guardar Cambios' : 'Agregar Producto'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 bg-gray-300 text-gray-700 py-3 rounded flex items-center gap-2 hover:bg-gray-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-amber-200">
          <table className="w-full">
            <thead className="bg-emerald-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Producto</th>
                <th className="px-6 py-4 text-left">Descripción</th>
                <th className="px-6 py-4 text-right">Precio</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`${
                    index % 2 === 0 ? 'bg-amber-50' : 'bg-white'
                  } hover:bg-amber-100 transition-colors`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <span className="text-emerald-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    {product.description.substring(0, 80)}...
                  </td>
                  <td className="px-6 py-4 text-right text-emerald-700">
                    ${product.price.toLocaleString('es-AR')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.stock === 0
                          ? 'bg-red-100 text-red-700'
                          : product.stock < 50
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {product.stock} bolsas
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `¿Estás seguro de eliminar "${product.name}"?`
                            )
                          ) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

# Super Campo - Sistema de E-commerce

## Estructura del Proyecto

Este proyecto es un sistema completo de e-commerce para Super Campo, empresa vendedora de semillas en Argentina.

## Páginas Disponibles

### 1. Página de Inicio (`/`)
- Landing page original con toda la información de la empresa
- Incluye:
  - Hero section con imagen destacada
  - Carrusel de productos
  - Sección "Sobre Nosotros"
  - Mapa de cobertura en Argentina
  - Formulario de contacto
  - Footer con información de contacto

### 2. Página de Ventas (`/ventas`)
- Tienda pública con todos los productos disponibles
- Los clientes pueden:
  - Ver todos los productos con fotos, precios y stock
  - Seleccionar cantidad de cada producto
  - Agregar productos al carrito
  - Ver el carrito en hover al pasar el mouse sobre el ícono del carrito
  - Acceder al carrito completo

### 3. Página de Administración (`/admin`)
- **IMPORTANTE**: Esta página NO tiene link en el menú principal
- Solo es accesible escribiendo la URL directamente: `http://tu-dominio.com/admin`
- Permite gestionar el inventario completo:
  - Agregar nuevos productos
  - Editar productos existentes (nombre, descripción, precio, stock, imagen)
  - Eliminar productos
  - Subir imágenes desde el computador (guardadas en Firebase Storage)
  - O usar URLs de imágenes externas
  - Ver tabla completa de productos con indicadores de stock

### 4. Página de Carrito (`/carrito`)
- Carrito de compras completo con:
  - Lista de productos agregados
  - Ajuste de cantidades
  - Eliminación de productos
  - Resumen del pedido con total
  - Botón para finalizar compra
  - Confirmación de pedido

## Navegación

El header incluye:
- Logo de Super Campo (link a inicio)
- Menú de navegación:
  - **Inicio**: Vuelve a la landing page
  - **Ventas**: Acceso a la tienda pública
  - *(Admin no aparece en el menú por seguridad)*
- Ícono de carrito (solo visible en páginas de Ventas y Carrito)
  - Muestra la cantidad de items
  - Al hacer hover, despliega vista previa del carrito

## Tecnologías

- **React** con TypeScript
- **Vite** como build tool
- **React Router** para navegación
- **Firebase** para base de datos y almacenamiento de imágenes
  - Firestore Database: almacena los productos
  - Firebase Storage: guarda las imágenes subidas
- **Tailwind CSS** v4 para estilos
- **Lucide React** para iconos

## Características del Sistema

### Gestión de Estado
- **ProductContext**: Maneja todos los productos (con Firebase o datos locales de ejemplo)
- **CartContext**: Maneja el carrito de compras (localStorage para persistencia)

### Modo Sin Conexión
Si Firebase no está configurado, el sistema funciona con:
- 6 productos de ejemplo predefinidos
- Datos almacenados solo en memoria (se pierden al recargar)
- Carrito funcional con localStorage

### Firebase (Opcional)
- Si configuras Firebase (ver `FIREBASE_CONFIG.md`):
  - Los productos se guardan en la nube
  - Cambios en tiempo real entre dispositivos
  - Carga de imágenes con URLs permanentes
  - Datos persistentes

## Diseño

El diseño refleja la tradición y profesionalismo de Super Campo:
- **Colores principales**:
  - Verde esmeralda (`emerald-800`) para headers y elementos principales
  - Ámbar (`amber-300`, `amber-400`) para acentos y highlights
  - Blanco y tonos cálidos para fondos
- **Tipografía**:
  - Fuentes serif para títulos (aspecto clásico y elegante)
  - Fuentes sans-serif para textos
- **Estilo**: Clásico, profesional, confiable

## Próximos Pasos

1. Configurar Firebase siguiendo `FIREBASE_CONFIG.md`
2. Agregar autenticación para proteger la página `/admin`
3. Implementar procesamiento real de pedidos (emails, WhatsApp, etc.)
4. Agregar filtros y búsqueda en la página de ventas
5. Implementar categorías de productos
6. Agregar sistema de descuentos o promociones

## Notas de Seguridad

⚠️ **IMPORTANTE**: En producción, debes:
- Agregar autenticación en Firebase para proteger `/admin`
- Configurar reglas de seguridad de Firestore y Storage
- Agregar validación de permisos antes de permitir escritura
- Considerar usar Firebase Authentication o un sistema de usuarios

El hecho de que `/admin` no tenga link en el menú es solo "seguridad por oscuridad" - **NO ES SUFICIENTE** para un sitio en producción.

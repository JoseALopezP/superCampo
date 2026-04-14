# Configuración de Firebase para Super Campo

Este proyecto está configurado para usar Firebase como base de datos. Sigue estos pasos para configurarlo:

## 1. Crear un Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Sigue los pasos para crear tu proyecto

## 2. Configurar Firestore Database

1. En el menú lateral, ve a **Build > Firestore Database**
2. Haz clic en "Crear base de datos"
3. Selecciona el modo de producción o prueba (recomendado: modo de prueba para desarrollo)
4. Elige la ubicación (recomendado: southamerica-east1 para Argentina)

## 3. Configurar Storage

1. En el menú lateral, ve a **Build > Storage**
2. Haz clic en "Comenzar"
3. Acepta las reglas de seguridad predeterminadas

## 4. Obtener las Credenciales

1. Ve a **Configuración del proyecto** (ícono de engranaje)
2. En la sección "Tus aplicaciones", haz clic en el ícono web `</>`
3. Registra tu aplicación con un nombre (ej: "Super Campo Web")
4. Copia las credenciales que te muestra Firebase

## 5. Actualizar el Archivo de Configuración

Abre el archivo `/src/app/firebase/config.ts` y reemplaza las credenciales:

```typescript
const firebaseConfig = {
  apiKey: "tu-api-key-aqui",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};
```

## 6. Estructura de la Base de Datos

El proyecto usará la siguiente estructura en Firestore:

### Colección: `products`

Cada documento representa un producto con los siguientes campos:

```
{
  name: string,          // Nombre del producto
  description: string,   // Descripción del producto
  price: number,         // Precio en pesos argentinos
  stock: number,         // Cantidad disponible
  image: string          // URL de la imagen (puede ser de Storage o externa)
}
```

## 7. Modo Sin Conexión

Si no configuras Firebase, el sistema funcionará con datos de ejemplo almacenados localmente. Los cambios no se guardarán entre sesiones.

## 8. Reglas de Seguridad Recomendadas

### Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura a todos
    match /products/{product} {
      allow read: if true;
      // Solo permitir escritura si tienes autenticación configurada
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Notas Importantes

- La página de administración (`/admin`) no tiene link en el menú principal por seguridad
- Accede directamente escribiendo la URL: `https://tu-dominio.com/admin`
- Se recomienda agregar autenticación de Firebase para proteger la página de admin en producción
- Los productos iniciales se mostrarán automáticamente si Firebase está configurado correctamente

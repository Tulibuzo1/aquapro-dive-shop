# AquaPro Dive Shop - Tienda de artículos de buceo

E-commerce de equipamiento de buceo desarrollado con React, Firebase y Bootstrap. 

---

## Funcionalidades

- **Carrito de compras** con Context API (agregar, eliminar, vaciar, finalizar compra)
- **Autenticación de usuarios** con Firebase Authentication (login, registro, logout)
- **Rutas protegidas** para secciones de administración (agregar y editar productos)
- **CRUD de productos** con Firebase Firestore (crear, leer, editar, eliminar)
- **Modal de confirmación** antes de eliminar productos
- **Barra de búsqueda** con filtrado en tiempo real por nombre, categoría y descripción
- **Paginador** para navegar el catálogo de productos (6 por página)
- **Spinners de carga** y manejo de errores en toda la aplicación
- **Formulario de contacto** conectado a Formspree
- **Diseño responsivo** con Bootstrap 5 y styled-components
- **SEO dinámico** con React Helmet (títulos y meta descriptions por página)
- **Iconografía** con React Icons en botones y elementos interactivos
- **Paleta de colores oceánica** con gradientes, sombras y hover effects

---

## Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| React 19 | Framework UI |
| Vite 8 | Build tool y dev server |
| Firebase | Authentication + Firestore (base de datos) |
| React Router DOM 7 | Enrutamiento SPA |
| Bootstrap 5 | Grid system y componentes base |
| styled-components | Componentes estilizados |
| React Icons | Iconografía |
| React Helmet Async | SEO dinámico |
| Formspree | Envío de formularios de contacto |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm o yarn
- Una cuenta de [Firebase](https://firebase.google.com/)
- Una cuenta de [Formspree](https://formspree.io/) (opcional, para el formulario de contacto)

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Tulibuzo1/aquapro-dive-shop.git
cd aquapro-dive-shop
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y completá con tus credenciales de Firebase:

```bash
cp .env.example .env
```

Editá el archivo `.env` con tu configuración de Firebase:

```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 4. Configurar Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar **Authentication** > Método: Email/Password
3. Crear una base de datos en **Firestore Database** (modo test)
4. Reglas de Firestore para desarrollo:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{productoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 6. Build para producción

```bash
npm run build
```

### 7. Vista previa del build

```bash
npm run preview
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── CartWidget/        # Widget del carrito en navbar
│   ├── ConfirmModal/      # Modal de confirmación genérico
│   ├── ContactForm/       # Formulario de contacto (Formspree)
│   ├── Footer/            # Pie de página con redes sociales
│   ├── Header/            # Cabecera con gradiente oceánico
│   ├── Item/              # Card de producto con hover effects
│   ├── ItemListContainer/ # Grid de productos con búsqueda y paginación
│   ├── Layout/            # Shell de la aplicación (Header + NavBar + Outlet + Footer)
│   ├── NavBar/            # Barra de navegación con auth
│   ├── Pagination/        # Componente de paginación
│   ├── ProtectedRoute/    # Ruta protegida por autenticación
│   ├── SearchBar/         # Barra de búsqueda en tiempo real
│   └── Spinner/           # Indicador de carga animado
├── config/
│   └── firebase.js        # Configuración de Firebase
├── context/
│   ├── AuthContext.jsx     # Estado de autenticación (login, register, logout)
│   ├── CartContext.jsx     # Estado del carrito (add, remove, clear)
│   └── ProductContext.jsx  # Estado de productos (Firestore + fallback local)
├── pages/
│   ├── CartPage.jsx        # Página del carrito con finalizar compra
│   ├── EditarProducto.jsx  # Editar producto existente (protegida)
│   ├── HomePage.jsx        # Página de inicio con hero y contacto
│   ├── LoginPage.jsx       # Inicio de sesión
│   ├── NuevoProducto.jsx   # Agregar nuevo producto (protegida)
│   ├── Nosotros.jsx        # Equipo / About Us
│   ├── ProductDetailPage.jsx # Detalle de producto
│   ├── ProductsPage.jsx    # Catálogo de productos + contacto
│   └── RegisterPage.jsx    # Registro de usuario
├── App.jsx                 # Router principal con providers
├── main.jsx                # Entry point
└── index.css               # Estilos globales (theme oceánico)
```

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Build para producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Verificar código con ESLint |

---

## Despliegue en Netlify

### Opción manual:
1. Ejecutar `npm run build`
2. Subir la carpeta `dist` a Netlify (drag & drop)

### Opción con GitHub:
1. Conectar el repositorio de GitHub en Netlify
2. Configurar:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Deploy automático en cada push



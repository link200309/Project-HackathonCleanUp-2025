# 🌱 EcoQuest - Frontend

Interfaz de usuario para EcoQuest, una PWA educativa gamificada sobre reciclaje y sostenibilidad.

## 🚀 Setup Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y completa con tus credenciales de Supabase:

```bash
cp .env.example .env
```

Edita `.env`:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── features/           # Módulos por funcionalidad
│   ├── auth/          # Autenticación
│   │   ├── components/  # RegisterForm, LoginForm
│   │   ├── context/     # AuthContext
│   │   └── pages/       # LoginPage, RegisterPage
│   ├── learning/      # Módulo de aprendizaje
│   ├── profile/       # Perfil de usuario
│   ├── rank/          # Ranking
│   └── library/       # Biblioteca educativa
├── shared/            # Componentes compartidos
│   ├── components/    # Button, Input, Card
│   └── layout/        # AuthLayout, MainLayout
├── lib/               # Configuración y utilidades
│   └── supabaseClient.js
├── pages/             # Páginas principales
└── App.jsx            # Router principal
```

## 🎨 Componentes UI Disponibles

### Button

```jsx
import { Button } from "./shared/components";

<Button variant="primary" size="lg" fullWidth>
  Click me
</Button>;
```

Variantes: `primary`, `secondary`, `outline`, `ghost`, `danger`  
Tamaños: `sm`, `md`, `lg`

### Input

```jsx
import { Input } from "./shared/components";
import { Mail } from "lucide-react";

<Input label="Email" type="email" icon={Mail} error="Error message" />;
```

### Card

```jsx
import { Card } from "./shared/components";

<Card padding="lg" shadow>
  Content here
</Card>;
```

## 🔐 Autenticación

La autenticación está implementada con Supabase Auth:

- **Registro**: `/register`
- **Login**: `/login`
- **Dashboard**: `/dashboard` (protegido)

### Usar el hook de Auth

```jsx
import { useAuth } from "./features/auth/context/AuthContext";

function MyComponent() {
  const { user, signIn, signUp, signOut } = useAuth();

  // ...
}
```

## 🛠️ Comandos Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Linter de código

## 📦 Dependencias Principales

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Supabase** - Backend/Auth
- **React Router** - Routing
- **React Hook Form** - Form validation
- **Lucide React** - Icons

## 🎨 Diseño

La interfaz está inspirada en **Duolingo**:

- ✅ Colores vibrantes (verde, azul, amarillo)
- ✅ Esquinas muy redondeadas (rounded-2xl, rounded-3xl)
- ✅ Sombras pronunciadas (shadow-xl)
- ✅ Bordes inferiores en botones (border-b-4)
- ✅ Animaciones suaves y feedback visual

## 🚀 Próximos Pasos

1. Configurar Supabase (ver `arch/SUPABASE-SETUP.md`)
2. Implementar módulo de aprendizaje
3. Crear sistema de retos
4. Implementar ranking en tiempo real
5. Agregar PWA manifest

## 📝 Notas

- El archivo `.env` no debe subirse a Git (ya está en `.gitignore`)
- Las rutas están protegidas con `ProtectedRoute` y `PublicRoute`
- El AuthContext provee el estado global de autenticación

---

**Versión**: 1.0.0  
**Fecha**: 25 de octubre de 2025

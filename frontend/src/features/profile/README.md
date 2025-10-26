# Feature: Profile

Funcionalidad de configuración y gestión de perfiles de usuario.

## 📁 Estructura

```
profile/
├── components/
│   └── ProfileSetupForm.jsx    # Formulario de configuración inicial
├── hooks/
│   ├── useProfileSetup.js      # Hook para actualizar perfil
│   └── index.js                # Barrel export
└── pages/
    └── ProfileSetupPage.jsx    # Página de onboarding
```

## 🎯 Flujo de Onboarding

1. Usuario se registra en `/register` (solo username, email, password)
2. Tras registro exitoso → redirección a `/profile-setup`
3. Usuario selecciona avatar y opcionalmente ingresa ciudad
4. Puede "Omitir por ahora" o "Continuar"
5. Redirección a `/dashboard`

## 🔒 Protección de Rutas

- `/profile-setup` - Requiere autenticación (ProtectedRoute)
- `/dashboard` - Requiere perfil completo (ProfileCheckRoute)

Si el perfil está incompleto (avatar default 🌱 y ciudad null), automáticamente redirige a `/profile-setup`.

## 🎨 Avatares Disponibles

```javascript
🌱 Brote (default)
🌿 Hoja
🌳 Árbol
🌻 Girasol
🍃 Hojas
🌾 Trigo
🌲 Pino
🌴 Palmera
🌵 Cactus
🌺 Flor
🍀 Trébol
🌼 Margarita
```

## 📊 Campos del Perfil

- `avatar_icon` (TEXT): Emoji del avatar - **Requerido** (default: '🌱')
- `city` (TEXT, nullable): Ciudad del usuario - **Opcional**

## 🔧 Uso del Hook

```jsx
import { useProfileSetup } from "@/features/profile/hooks";

const { updateProfile, loading, error } = useProfileSetup();

await updateProfile({
  city: "La Paz",
  avatarIcon: "🌳",
});
```

## ✅ Criterio de Perfil Completo

El perfil se considera completo si:

- Avatar es diferente al default ('🌱') **O**
- Ciudad no es null

Este criterio permite flexibilidad: usuarios pueden completar solo uno de los dos campos.

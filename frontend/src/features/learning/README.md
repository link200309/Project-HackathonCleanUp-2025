# 🎓 Learning Feature - Interfaz de Aprendizaje Estilo Duolingo

## 📋 Descripción

Interfaz principal de aprendizaje que muestra un **camino (path) de lecciones** interactivo similar a Duolingo, donde los usuarios progresan a través de diferentes niveles y desafíos de reciclaje.

## 🎨 Componentes

### 1. **LessonNode**

`features/learning/components/LessonNode.jsx`

Nodo individual de lección en el camino de aprendizaje.

**Props:**

- `type`: `'lesson' | 'test' | 'story'` - Tipo de nodo
- `isCompleted`: `boolean` - Si la lección está completada (⭐ amarillo)
- `isActive`: `boolean` - Si la lección está activa (🟢 verde pulsante)
- `isLocked`: `boolean` - Si la lección está bloqueada (🔒 gris)
- `title`: `string` - Título de la lección
- `stars`: `number` - Estrellas obtenidas (0-3)
- `onClick`: `function` - Callback al hacer click

**Estados Visuales:**

- 🔒 **Bloqueado**: Gris con candado
- 🟢 **Activo**: Verde brillante con animación pulse
- ⭐ **Completado**: Amarillo con estrellas
- ⚪ **Inactivo**: Gris claro

### 2. **LearningPath**

`features/learning/components/LearningPath.jsx`

Contenedor del camino de lecciones con diseño zigzag.

**Props:**

- `lessons`: `Array<Lesson>` - Array de lecciones
- `onLessonClick`: `function` - Callback cuando se clickea una lección

**Características:**

- ✅ Diseño en zigzag (8 posiciones diferentes)
- ✅ Línea vertical decorativa con gradiente
- ✅ Animaciones de transición suaves
- ✅ Responsive y centrado

### 3. **UnitHeader**

`features/learning/components/UnitHeader.jsx`

Cabecera de unidad con diseño colorido.

**Props:**

- `unitNumber`: `number` - Número de unidad
- `title`: `string` - Título de la unidad
- `description`: `string` - Descripción breve
- `color`: `'green' | 'blue' | 'yellow' | 'purple' | 'red'` - Color del tema
- `onBack`: `function` - Callback para botón de retroceso

### 4. **LearningPage**

`features/learning/pages/LearningPage.jsx`

Página principal que integra todos los componentes.

## 🎯 Características

### Barra Superior (Header)

- 🔥 **Racha**: Días consecutivos de práctica
- 💎 **XP**: Puntos de experiencia acumulados
- ❤️ **Vidas**: Sistema de vidas (5 máximo)
- 🏆 **Ranking**: Acceso rápido al leaderboard
- 👤 **Perfil**: Avatar y acceso a configuración

### Camino de Aprendizaje

- ✅ **12 lecciones** por unidad
- ✅ **Tipos variados**: Lecciones, historias, pruebas
- ✅ **Sistema de estrellas**: 0-3 estrellas por lección
- ✅ **Progreso visual**: Barra de progreso al final
- ✅ **Desbloqueo secuencial**: Completar para avanzar

### Animaciones

- 🌟 **Pulse**: Lección activa pulsa
- 🎨 **Hover**: Escala al pasar el mouse
- 🔄 **Transiciones**: Suaves y fluidas
- 📊 **Progreso**: Animación de barra de progreso

## 🛣️ Rutas

```jsx
/learn - Página principal de aprendizaje
/challenge/:id - Página de desafío individual (próximamente)
```

## 🔄 Flujo de Usuario

1. **Login** → `/login`
2. **Configurar perfil** → `/profile-setup`
3. **Aprender** → `/learn` (página principal)
4. **Click en lección activa** → `/challenge/:id`
5. **Completar desafío** → Volver a `/learn` con progreso actualizado

## 📊 Estructura de Datos

### Lesson Object

```javascript
{
  id: number | string,
  type: 'lesson' | 'test' | 'story',
  title: string,
  isCompleted: boolean,
  isActive: boolean,
  isLocked: boolean,
  stars: number (0-3)
}
```

## 🎨 Estilos Duolingo

### Colores

- **Verde**: `#10B981` (Activo)
- **Amarillo**: `#FBBF24` (Completado)
- **Gris**: `#9CA3AF` (Bloqueado/Inactivo)
- **Azul**: `#3B82F6` (Gemas/XP)
- **Naranja**: `#F97316` (Racha)
- **Rojo**: `#EF4444` (Vidas)

### Tipografía

- **Font**: System fonts (Tailwind default)
- **Weights**:
  - `font-bold` (700) - Títulos
  - `font-black` (900) - Headers
  - `font-medium` (500) - Texto normal

## 🔧 Integración con Supabase

**Próximas implementaciones:**

```javascript
// Cargar lecciones desde Supabase
const { data: lessons } = await supabase
  .from("challenges")
  .select("*")
  .eq("is_active", true)
  .order("difficulty_level", { ascending: true });

// Cargar progreso del usuario
const { data: progress } = await supabase
  .from("user_progress")
  .select("*")
  .eq("user_id", user.id);
```

## ✅ TODO

- [ ] Conectar con Supabase para lecciones reales
- [ ] Implementar página de desafío (`/challenge/:id`)
- [ ] Sistema de vidas funcional
- [ ] Sistema de rachas
- [ ] Animaciones de celebración al completar
- [ ] Sonidos de feedback
- [ ] Modo oscuro
- [ ] Unidades múltiples con scroll infinito

## 🎯 Próximos Pasos

1. **Crear ChallengePage**: Página donde se resuelven los desafíos
2. **Implementar useLessons hook**: Cargar lecciones desde Supabase
3. **Sistema de progreso**: Guardar y actualizar progreso en tiempo real
4. **Celebraciones**: Animaciones al completar lecciones
5. **Ranking**: Mostrar top usuarios por XP

---

**Última actualización:** 25 de octubre de 2025  
**Proyecto:** EcoQuest - Hackathon CleanUp 2025

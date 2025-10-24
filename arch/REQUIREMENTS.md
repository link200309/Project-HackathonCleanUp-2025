# 📋 Documento de Requerimientos - EcoQuest

## 1. Requerimientos Funcionales

### 1.1 Autenticación y Gestión de Usuarios

#### RF-001: Registro de Usuario

- **Descripción**: El sistema debe permitir que los usuarios se registren con email y contraseña
- **Prioridad**: Alta
- **Implementación**: Supabase Auth
- **Criterios de aceptación**:
  - Validación de email único
  - Contraseña mínima de 6 caracteres
  - Confirmación de email

#### RF-002: Inicio de Sesión

- **Descripción**: Los usuarios registrados deben poder iniciar sesión
- **Prioridad**: Alta
- **Implementación**: Supabase Auth
- **Criterios de aceptación**:
  - Login con email y contraseña
  - Opción de recordar sesión
  - Recuperación de contraseña

#### RF-003: Autenticación Social (Opcional)

- **Descripción**: Permitir login con Google/Facebook
- **Prioridad**: Media
- **Implementación**: Supabase Auth Providers

### 1.2 Módulo de Aprendizaje (Tipo Duolingo)

#### RF-004: Sistema de Niveles Progresivos

- **Descripción**: Organizar el contenido educativo en niveles de dificultad
- **Prioridad**: Alta
- **Categorías requeridas**:
  - Nivel 1: Residuos Orgánicos
  - Nivel 2: Plásticos
  - Nivel 3: Papel y Cartón
  - Nivel 4: Vidrio
  - Nivel 5: Residuos Peligrosos
- **Criterios de aceptación**:
  - Desbloqueo progresivo de niveles
  - Indicador visual de progreso
  - Mínimo 5 retos por nivel

#### RF-005: Mini-Retos Interactivos

- **Descripción**: Implementar retos gamificados de clasificación de residuos
- **Prioridad**: Alta
- **Tipos de retos**:
  - Clasificación drag & drop (arrastrar basura al contenedor correcto)
  - Quiz de opción múltiple
  - Verdadero/Falso
  - Identificación de material
- **Criterios de aceptación**:
  - Feedback inmediato (correcto/incorrecto)
  - Explicación educativa tras cada respuesta
  - Animaciones visuales atractivas

#### RF-006: Sistema de Vidas

- **Descripción**: Implementar mecánica de vidas (ej: 5 vidas máximo)
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Se pierde 1 vida por respuesta incorrecta
  - Las vidas se regeneran con el tiempo (1 vida cada 30 min)
  - Indicador visual de vidas restantes

#### RF-007: Sistema de Experiencia (XP)

- **Descripción**: Los usuarios ganan puntos de experiencia al completar retos
- **Prioridad**: Alta
- **Criterios de aceptación**:
  - XP por respuesta correcta (10-50 puntos según dificultad)
  - XP acumulativo
  - Barra de progreso visual

#### RF-008: Sistema de Rachas Diarias

- **Descripción**: Incentivar el uso diario con rachas
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Contador de días consecutivos de actividad
  - Bonus de XP por mantener racha (ej: +20% XP a partir del día 7)
  - Notificación de racha en riesgo

#### RF-009: Logros Desbloqueables

- **Descripción**: Sistema de insignias y logros
- **Prioridad**: Media
- **Ejemplos de logros**:
  - "Primera Misión" - Completar primer reto
  - "Eco Guerrero" - 100 retos completados
  - "Racha de Fuego" - 7 días consecutivos
  - "Maestro del Reciclaje" - Completar todos los niveles
  - "Perfeccionista" - 50 respuestas perfectas seguidas

### 1.3 Módulo EcoRank (Ranking Competitivo)

#### RF-010: Ranking Global de Usuarios

- **Descripción**: Mostrar tabla de clasificación de usuarios por XP
- **Prioridad**: Alta
- **Criterios de aceptación**:
  - Top 100 usuarios visibles
  - Actualización en tiempo real (Supabase Realtime)
  - Posición actual del usuario destacada

#### RF-011: Ranking Semanal

- **Descripción**: Tabla de clasificación que se resetea semanalmente
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Reset automático cada lunes a las 00:00
  - Premios especiales para top 3 de la semana

#### RF-012: Sistema de Medallas

- **Descripción**: Medallas visuales según posición en ranking
- **Prioridad**: Media
- **Categorías**:
  - 🥇 Oro: Top 3
  - 🥈 Plata: Top 10
  - 🥉 Bronce: Top 50

### 1.4 Módulo Educativo / Biblioteca Verde

#### RF-013: Repositorio de Artículos

- **Descripción**: Biblioteca de contenido educativo sobre sostenibilidad
- **Prioridad**: Alta
- **Categorías requeridas**:
  - Compostaje
  - Consumo Responsable
  - Contaminación
  - Energías Verdes
  - Reciclaje Avanzado
- **Criterios de aceptación**:
  - Mínimo 20 artículos al lanzamiento
  - Formato: texto + imágenes + infografías
  - Tiempo de lectura estimado

#### RF-014: Búsqueda y Filtrado

- **Descripción**: Permitir buscar artículos por categoría o palabra clave
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Búsqueda por texto
  - Filtro por categoría
  - Ordenar por: más recientes, más leídos

#### RF-015: Mini-Cuestionarios Post-Lectura

- **Descripción**: Quiz breve tras leer un artículo para reforzar aprendizaje
- **Prioridad**: Media
- **Criterios de aceptación**:
  - 3-5 preguntas relacionadas al artículo
  - XP bonus por completar (+20 XP)
  - Opcional (el usuario puede omitir)

#### RF-016: Sistema de Favoritos

- **Descripción**: Guardar artículos para lectura posterior
- **Prioridad**: Baja
- **Criterios de aceptación**:
  - Botón de "Guardar" en cada artículo
  - Sección "Mis Favoritos" en el perfil

### 1.5 Perfil Ecológico Personalizable

#### RF-017: Avatar Personalizable

- **Descripción**: Permitir personalizar la apariencia del avatar
- **Prioridad**: Media
- **Opciones de personalización**:
  - Ícono/imagen (selección de biblioteca)
  - Color de fondo
  - Marco decorativo (desbloqueables)
- **Criterios de aceptación**:
  - Previsualización en tiempo real
  - Guardar cambios

#### RF-018: Información de Perfil

- **Descripción**: Datos básicos del usuario
- **Prioridad**: Alta
- **Campos**:
  - Nombre de usuario
  - Ciudad (opcional)
  - Lema ecológico (frase personalizada, max 50 caracteres)
  - Fecha de registro
- **Criterios de aceptación**:
  - Editable en cualquier momento
  - Validación de nombre único

#### RF-019: Estadísticas Personales

- **Descripción**: Dashboard de métricas del usuario
- **Prioridad**: Alta
- **Métricas a mostrar**:
  - XP Total
  - Nivel actual (Bronce → Plata → Oro → Verde Legendario)
  - Racha de días consecutivos
  - Cantidad de logros obtenidos
  - Retos completados
  - Posición en ranking global
  - Gráfico de progreso semanal/mensual
- **Criterios de aceptación**:
  - Visualización clara con gráficos
  - Actualización automática

#### RF-020: Sistema de Niveles

- **Descripción**: Clasificación jerárquica del usuario según XP
- **Prioridad**: Alta
- **Niveles**:
  - 🌱 Bronce: 0-999 XP
  - 🌿 Plata: 1000-2999 XP
  - ⭐ Oro: 3000-5999 XP
  - 🏆 Verde Legendario: 6000+ XP
- **Criterios de aceptación**:
  - Indicador visual de nivel
  - Animación al subir de nivel

### 1.6 Funcionalidades PWA

#### RF-021: Instalación como PWA

- **Descripción**: La app debe ser instalable en dispositivos móviles y desktop
- **Prioridad**: Alta
- **Criterios de aceptación**:
  - Manifest.json configurado
  - Prompt de instalación
  - Ícono de app personalizado

#### RF-022: Modo Offline

- **Descripción**: Funcionalidad básica sin conexión
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Service Worker implementado
  - Cache de contenido estático
  - Mensaje claro cuando no hay conexión
  - Sincronización al recuperar conexión

#### RF-023: Notificaciones Push (Opcional)

- **Descripción**: Recordatorios para mantener racha
- **Prioridad**: Baja
- **Criterios de aceptación**:
  - Permiso del usuario
  - Notificación diaria personalizada

---

## 2. Requerimientos No Funcionales

### 2.1 Rendimiento

#### RNF-001: Tiempo de Carga

- **Descripción**: La aplicación debe cargar en menos de 3 segundos
- **Métrica**: First Contentful Paint < 1.5s

#### RNF-002: Responsive Design

- **Descripción**: Compatible con dispositivos móviles, tablets y desktop
- **Breakpoints**:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+

#### RNF-003: Optimización de Imágenes

- **Descripción**: Todas las imágenes deben estar optimizadas
- **Formato**: WebP preferentemente
- **Tamaño máximo**: 200KB por imagen

### 2.2 Seguridad

#### RNF-004: Autenticación Segura

- **Descripción**: Implementar JWT tokens con Supabase
- **Criterios**:
  - Tokens con expiración
  - Refresh tokens
  - HTTPS obligatorio

#### RNF-005: Protección de Datos

- **Descripción**: Cumplir con mejores prácticas de privacidad
- **Criterios**:
  - Encriptación de contraseñas
  - No almacenar datos sensibles en localStorage
  - Validación de inputs (prevenir XSS)

### 2.3 Usabilidad

#### RNF-006: Interfaz Intuitiva

- **Descripción**: La UI debe ser clara y fácil de usar
- **Criterios**:
  - Navegación máximo en 3 clics
  - Feedback visual inmediato en todas las acciones
  - Mensajes de error claros

#### RNF-007: Accesibilidad

- **Descripción**: Cumplir con estándares básicos de accesibilidad
- **Criterios**:
  - Contraste de colores adecuado (WCAG AA)
  - Textos alternativos en imágenes
  - Navegación por teclado funcional

### 2.4 Escalabilidad

#### RNF-008: Base de Datos

- **Descripción**: Diseño de BD que soporte crecimiento
- **Criterios**:
  - Índices en campos de búsqueda frecuente
  - Paginación en listados
  - Query optimization

#### RNF-009: Manejo de Concurrencia

- **Descripción**: Soporte para múltiples usuarios simultáneos
- **Criterios**:
  - Supabase Realtime para actualizaciones en vivo
  - Manejo de race conditions en ranking

---

## 3. Requerimientos de Datos

### 3.1 Modelo de Base de Datos (Supabase - PostgreSQL)

#### Tabla: `users`

```sql
- id (uuid, PK)
- email (text, unique)
- username (text, unique)
- city (text, nullable)
- eco_motto (text, max 50 chars, nullable)
- avatar_icon (text)
- avatar_color (text)
- created_at (timestamp)
- updated_at (timestamp)
```

#### Tabla: `user_stats`

```sql
- id (uuid, PK)
- user_id (uuid, FK → users.id)
- total_xp (integer, default 0)
- current_level (text, default 'Bronce')
- current_streak (integer, default 0)
- longest_streak (integer, default 0)
- lives (integer, default 5)
- challenges_completed (integer, default 0)
- last_activity_date (date)
- created_at (timestamp)
- updated_at (timestamp)
```

#### Tabla: `challenges`

```sql
- id (uuid, PK)
- category (text) -- 'organicos', 'plasticos', 'papel', 'vidrio', 'peligrosos'
- difficulty_level (integer) -- 1-5
- type (text) -- 'drag_drop', 'multiple_choice', 'true_false'
- question (text)
- correct_answer (text)
- options (jsonb) -- Array de opciones para multiple choice
- explanation (text) -- Feedback educativo
- xp_reward (integer)
- image_url (text, nullable)
- created_at (timestamp)
```

#### Tabla: `user_progress`

```sql
- id (uuid, PK)
- user_id (uuid, FK → users.id)
- challenge_id (uuid, FK → challenges.id)
- is_completed (boolean)
- is_correct (boolean)
- attempts (integer, default 1)
- completed_at (timestamp)
```

#### Tabla: `achievements`

```sql
- id (uuid, PK)
- name (text)
- description (text)
- icon (text)
- requirement_type (text) -- 'challenges_count', 'streak', 'xp_total'
- requirement_value (integer)
- xp_bonus (integer)
- created_at (timestamp)
```

#### Tabla: `user_achievements`

```sql
- id (uuid, PK)
- user_id (uuid, FK → users.id)
- achievement_id (uuid, FK → achievements.id)
- unlocked_at (timestamp)
```

#### Tabla: `articles`

```sql
- id (uuid, PK)
- title (text)
- content (text)
- category (text) -- 'compostaje', 'consumo', 'contaminacion', 'energia', 'reciclaje'
- image_url (text)
- reading_time (integer) -- minutos
- author (text, nullable)
- views_count (integer, default 0)
- created_at (timestamp)
- updated_at (timestamp)
```

#### Tabla: `article_quizzes`

```sql
- id (uuid, PK)
- article_id (uuid, FK → articles.id)
- question (text)
- correct_answer (text)
- options (jsonb)
- created_at (timestamp)
```

#### Tabla: `user_favorites`

```sql
- id (uuid, PK)
- user_id (uuid, FK → users.id)
- article_id (uuid, FK → articles.id)
- created_at (timestamp)
```

---

## 4. Requerimientos de Integración

### 4.1 Supabase

#### RI-001: Configuración de Authentication

- Habilitar email/password authentication
- Configurar políticas de RLS (Row Level Security)

#### RI-002: Configuración de Storage

- Bucket para avatares de usuario
- Bucket para imágenes de artículos
- Bucket para assets del juego

#### RI-003: Realtime

- Habilitar Realtime para tabla `user_stats` (ranking en vivo)

### 4.2 Deploy

#### RI-004: Vercel

- Configurar variables de entorno (SUPABASE_URL, SUPABASE_ANON_KEY)
- Configurar dominio personalizado (opcional)

#### RI-005: Capacitor (Opcional - Fase 2)

- Configurar para Android/iOS
- Generar APK/IPA

---

## 5. Requerimientos de UI/UX

### 5.1 Diseño Visual

#### RUI-001: Paleta de Colores Ecológica

- Primario: Verde (#10B981 o similar)
- Secundario: Azul (#3B82F6)
- Acentos: Amarillo (#FBBF24) para logros
- Neutros: Grises (#6B7280, #F3F4F6)

#### RUI-002: Tipografía

- Fuente principal: Inter, Poppins o similar (legible y moderna)
- Tamaños jerárquicos claros

#### RUI-003: Iconografía

- Usar biblioteca de iconos consistente (Heroicons, Lucide, etc.)
- Iconos temáticos de naturaleza y reciclaje

### 5.2 Componentes Principales

#### RUI-004: Navegación

- Navbar superior con logo y perfil
- Menú lateral o bottom navigation (móvil)
- Secciones: Aprender, Ranking, Biblioteca, Perfil

#### RUI-005: Animaciones

- Transiciones suaves entre pantallas
- Animaciones de celebración al completar retos
- Micro-interacciones en botones

#### RUI-006: Feedback Visual

- Loading states en todas las operaciones asíncronas
- Toast notifications para acciones exitosas/errores
- Progress bars visibles

---

## 6. Priorización de Features (MVP)

### 🔴 Prioridad ALTA (MVP - Fase 1)

- Autenticación (RF-001, RF-002)
- Sistema de niveles y retos (RF-004, RF-005)
- Sistema de XP (RF-007)
- Ranking global (RF-010)
- Perfil básico con estadísticas (RF-018, RF-019)
- 3 categorías de retos mínimo
- 10 artículos educativos mínimo (RF-013)
- PWA básica (RF-021)

### 🟡 Prioridad MEDIA (Fase 2)

- Sistema de vidas (RF-006)
- Rachas diarias (RF-008)
- Logros y medallas (RF-009, RF-012)
- Ranking semanal (RF-011)
- Avatar personalizable (RF-017)
- Búsqueda de artículos (RF-014)
- Modo offline completo (RF-022)

### 🟢 Prioridad BAJA (Futuras mejoras)

- Autenticación social (RF-003)
- Mini-quizzes post-lectura (RF-015)
- Sistema de favoritos (RF-016)
- Notificaciones push (RF-023)
- App nativa con Capacitor (RI-005)

---

## 7. Criterios de Éxito del Proyecto

1. **Funcionalidad**: Todos los requerimientos de prioridad ALTA implementados y funcionando
2. **Performance**: Lighthouse Score > 90 en todas las métricas
3. **UX**: Al menos 5 usuarios beta completan el flujo completo sin asistencia
4. **Código**: Cobertura de tests > 60%
5. **Deploy**: App accesible públicamente con dominio

---

## 8. Restricciones y Limitaciones

- **Tiempo**: Proyecto debe completarse en el plazo del hackathon
- **Presupuesto**: Tier gratuito de Supabase (50,000 usuarios activos mensuales)
- **Equipo**: Desarrollo individual o equipo pequeño
- **Contenido**: Información educativa debe ser verificada y precisa

---

## 9. Riesgos Identificados

| Riesgo                                  | Probabilidad | Impacto | Mitigación                                    |
| --------------------------------------- | ------------ | ------- | --------------------------------------------- |
| Complejidad del sistema de gamificación | Media        | Alto    | Empezar con MVP simple, iterar                |
| Problemas de performance en móviles     | Media        | Medio   | Optimización de imágenes, lazy loading        |
| Falta de contenido educativo de calidad | Baja         | Alto    | Investigar fuentes confiables desde el inicio |
| Límites del tier gratuito de Supabase   | Baja         | Medio   | Monitorear uso, optimizar queries             |

---

## 10. Entregables del Proyecto

- ✅ Código fuente en repositorio Git (GitHub)
- ✅ Aplicación desplegada en Vercel
- ✅ Base de datos configurada en Supabase
- ✅ Documentación técnica (README.md)
- ✅ Guía de usuario (opcional)
- ✅ Presentación del proyecto (slides)
- ✅ Video demo (2-3 minutos)

---

**Fecha de creación**: 24 de octubre de 2025  
**Versión**: 1.0  
**Estado**: Aprobado para desarrollo

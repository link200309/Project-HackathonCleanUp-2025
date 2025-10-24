# 👥 Historias de Usuario - EcoQuest

## 📅 Información del Sprint

- **Duración**: 2 días (Sábado 25 - Domingo 26 de Octubre 2025)
- **Equipo**: 2 desarrolladores
- **Objetivo**: MVP funcional y desplegado
- **Horas disponibles**: ~16 horas/día × 2 personas = 32 horas-persona por día

---

## 🎯 Priorización para Hackathon (2 días)

### ⚡ DÍA 1 - SÁBADO 25 OCT (Core Funcionalidad)

**Objetivo**: Base funcional + Autenticación + Primer módulo jugable

### 🚀 DÍA 2 - DOMINGO 26 OCT (Features + Deploy)

**Objetivo**: Completar features MVP + Pulir UI + Deploy + Presentación

---

## 📋 Backlog Priorizado

### 🔴 CRÍTICO - DÍA 1 (Sábado 25 Oct)

#### Sprint 1.1: Setup e Infraestructura (2-3 horas)

**Responsable Sugerido**: Desarrollador 1

---

#### **US-001: Configuración Inicial del Proyecto**

**Como** desarrollador  
**Quiero** tener el proyecto React configurado con todas las dependencias  
**Para** poder empezar a desarrollar funcionalidades

**Criterios de Aceptación**:

- [x] Proyecto React + Vite inicializado
- [x] Tailwind CSS configurado
- [x] Supabase SDK instalado y configurado
- [x] Variables de entorno configuradas
- [x] Estructura de carpetas creada (`components/`, `features/`, `hooks/`, `lib/`, `pages/`)
- [x] Cliente de Supabase funcionando

**Estimación**: 1 hora  
**Prioridad**: P0 - Bloqueante

---

#### **US-002: Configuración de Supabase Backend**

**Como** desarrollador  
**Quiero** tener la base de datos y autenticación configuradas en Supabase  
**Para** poder implementar las funcionalidades del usuario

**Criterios de Aceptación**:

- [x] Proyecto Supabase creado
- [x] Tablas `users`, `user_stats`, `challenges`, `user_progress` creadas
- [x] RLS (Row Level Security) configurado
- [x] Autenticación email/password habilitada
- [x] 10-15 challenges de ejemplo insertados (categorías: orgánicos, plásticos, papel)
- [x] Trigger para crear perfil automático al registrarse

**Estimación**: 1.5 horas  
**Prioridad**: P0 - Bloqueante

---

#### Sprint 1.2: Autenticación (2-3 horas)

**Responsable Sugerido**: Desarrollador 2 (mientras Dev 1 hace Supabase)

---

#### **US-003: Registro de Usuario**

**Como** usuario nuevo  
**Quiero** poder registrarme con email y contraseña  
**Para** acceder a la aplicación y guardar mi progreso

**Criterios de Aceptación**:

- [ ] Formulario de registro con campos: email, username, contraseña
- [ ] Validación de email único
- [ ] Validación de contraseña mínima 6 caracteres
- [ ] Creación automática de perfil en `users` y `user_stats`
- [ ] Mensaje de éxito/error
- [ ] Redirección al dashboard tras registro exitoso

**Estimación**: 1.5 horas  
**Prioridad**: P0

**Tareas técnicas**:

- Crear componente `RegisterForm.jsx`
- Implementar hook `useAuth.js`
- Integrar con `supabase.auth.signUp()`
- Manejo de estados y errores

---

#### **US-004: Inicio de Sesión**

**Como** usuario registrado  
**Quiero** poder iniciar sesión con mis credenciales  
**Para** acceder a mi cuenta y continuar mi progreso

**Criterios de Aceptación**:

- [ ] Formulario de login con email y contraseña
- [ ] Validación de campos
- [ ] Manejo de errores (credenciales incorrectas)
- [ ] Persistencia de sesión
- [ ] Redirección al dashboard

**Estimación**: 1 hora  
**Prioridad**: P0

**Tareas técnicas**:

- Crear componente `LoginForm.jsx`
- Implementar `supabase.auth.signInWithPassword()`
- Context API para estado global de usuario

---

#### **US-005: Cierre de Sesión**

**Como** usuario autenticado  
**Quiero** poder cerrar mi sesión  
**Para** proteger mi cuenta

**Criterios de Aceptación**:

- [ ] Botón de "Cerrar Sesión" en navbar
- [ ] Confirmación antes de cerrar sesión
- [ ] Limpieza de estado local
- [ ] Redirección a página de login

**Estimación**: 0.5 horas  
**Prioridad**: P1

---

#### Sprint 1.3: Layout y Navegación (1-2 horas)

**Responsable Sugerido**: Desarrollador 1

---

#### **US-006: Navegación Principal**

**Como** usuario  
**Quiero** tener un menú de navegación claro  
**Para** acceder fácilmente a las diferentes secciones

**Criterios de Aceptación**:

- [ ] Navbar responsive con logo "EcoQuest"
- [ ] Menú con enlaces a: Aprender, Ranking, Perfil
- [ ] Avatar/nombre de usuario en navbar
- [ ] Bottom navigation en móvil
- [ ] Indicador de sección activa

**Estimación**: 1.5 horas  
**Prioridad**: P0

**Tareas técnicas**:

- Crear componente `Navbar.jsx`
- Crear componente `MobileNav.jsx`
- Implementar React Router
- Estilos con Tailwind

---

#### Sprint 1.4: Módulo de Aprendizaje (4-5 horas)

**Responsable Sugerido**: Ambos desarrolladores (dividir tareas)

---

#### **US-007: Ver Lista de Retos por Categoría**

**Como** usuario  
**Quiero** ver los retos organizados por categorías  
**Para** aprender sobre diferentes tipos de residuos

**Criterios de Aceptación**:

- [ ] Pantalla principal de "Aprender" con 3 categorías visibles (Orgánicos, Plásticos, Papel)
- [ ] Cards visuales con icono de cada categoría
- [ ] Indicador de progreso por categoría (X/Y completados)
- [ ] Click en categoría muestra lista de retos

**Estimación**: 1.5 horas  
**Prioridad**: P0

**Tareas técnicas**:

- Crear componente `CategoryList.jsx`
- Fetch de challenges desde Supabase
- Calcular progreso por categoría

---

#### **US-008: Realizar Reto de Opción Múltiple**

**Como** usuario  
**Quiero** responder preguntas de opción múltiple  
**Para** aprender sobre clasificación de residuos

**Criterios de Aceptación**:

- [ ] Mostrar pregunta con 4 opciones
- [ ] Click en opción la resalta
- [ ] Botón "Confirmar" para enviar respuesta
- [ ] Feedback visual inmediato (verde=correcto, rojo=incorrecto)
- [ ] Mostrar explicación educativa tras responder
- [ ] Sumar XP si es correcta
- [ ] Botón "Siguiente" para continuar

**Estimación**: 2.5 horas  
**Prioridad**: P0

**Tareas técnicas**:

- Crear componente `ChallengeQuestion.jsx`
- Implementar lógica de validación
- Actualizar `user_progress` y `user_stats` en Supabase
- Animaciones de feedback

---

#### **US-009: Ver Progreso de XP**

**Como** usuario  
**Quiero** ver mi XP actual y nivel  
**Para** saber cuánto he progresado

**Criterios de Aceptación**:

- [ ] Barra de progreso de XP en parte superior
- [ ] Mostrar XP actual / XP necesario para siguiente nivel
- [ ] Indicador de nivel actual (Bronce, Plata, Oro, Verde Legendario)
- [ ] Animación al ganar XP

**Estimación**: 1 hora  
**Prioridad**: P1

**Tareas técnicas**:

- Crear componente `XPBar.jsx`
- Lógica de cálculo de nivel
- Animaciones con CSS/Tailwind

---

### 🟡 IMPORTANTE - DÍA 2 MAÑANA (Domingo 26 Oct)

#### Sprint 2.1: Perfil y Estadísticas (2-3 horas)

**Responsable Sugerido**: Desarrollador 2

---

#### **US-010: Ver Perfil Personal**

**Como** usuario  
**Quiero** ver mi perfil con mis estadísticas  
**Para** conocer mi progreso general

**Criterios de Aceptación**:

- [ ] Pantalla de perfil con avatar (icono por defecto)
- [ ] Mostrar: username, nivel, XP total
- [ ] Estadísticas clave:
  - Retos completados
  - Racha actual (días consecutivos)
  - Posición en ranking global
- [ ] Diseño visual atractivo con cards

**Estimación**: 2 horas  
**Prioridad**: P1

**Tareas técnicas**:

- Crear componente `UserProfile.jsx`
- Fetch de datos de `users` y `user_stats`
- Componente `StatCard.jsx` reutilizable

---

#### **US-011: Editar Nombre de Usuario**

**Como** usuario  
**Quiero** poder cambiar mi nombre de usuario  
**Para** personalizar mi perfil

**Criterios de Aceptación**:

- [ ] Botón "Editar perfil"
- [ ] Modal/formulario para cambiar username
- [ ] Validación de username único
- [ ] Guardar cambios en Supabase
- [ ] Feedback visual de éxito

**Estimación**: 1 hora  
**Prioridad**: P2

---

#### Sprint 2.2: Ranking Global (2-3 horas)

**Responsable Sugerido**: Desarrollador 1

---

#### **US-012: Ver Ranking Global de Usuarios**

**Como** usuario  
**Quiero** ver el ranking de los mejores jugadores  
**Para** compararme y motivarme a mejorar

**Criterios de Aceptación**:

- [ ] Pantalla de "Ranking" con Top 50 usuarios
- [ ] Tabla/lista con: posición, username, nivel, XP
- [ ] Resaltar al usuario actual
- [ ] Indicadores visuales para Top 3 (🥇🥈🥉)
- [ ] Responsive en móvil

**Estimación**: 2 horas  
**Prioridad**: P1

**Tareas técnicas**:

- Crear componente `Leaderboard.jsx`
- Query optimizada: `SELECT users + user_stats ORDER BY xp DESC`
- Componente `RankingRow.jsx`
- Scroll virtual para performance (opcional)

---

#### **US-013: Actualización en Tiempo Real del Ranking**

**Como** usuario  
**Quiero** ver el ranking actualizarse en tiempo real  
**Para** ver los cambios inmediatamente

**Criterios de Aceptación**:

- [ ] Ranking se actualiza automáticamente cuando alguien gana XP
- [ ] No requiere recargar la página
- [ ] Transición suave de posiciones

**Estimación**: 1 hora  
**Prioridad**: P2

**Tareas técnicas**:

- Implementar Supabase Realtime
- Subscribe a cambios en `user_stats`
- Actualizar estado local

---

#### Sprint 2.3: Features Adicionales (2-3 horas)

**Responsable Sugerido**: Ambos

---

#### **US-014: Sistema de Vidas Básico**

**Como** usuario  
**Quiero** tener vidas limitadas  
**Para** que el juego sea más desafiante

**Criterios de Aceptación**:

- [ ] Mostrar contador de vidas (máx 5) en pantalla de retos
- [ ] Perder 1 vida al fallar una pregunta
- [ ] Mensaje cuando se acaban las vidas
- [ ] No permitir continuar sin vidas
- [ ] (Simplificado: regeneración manual o esperar)

**Estimación**: 1.5 horas  
**Prioridad**: P2

---

#### **US-015: Contador de Racha Diaria**

**Como** usuario  
**Quiero** ver mi racha de días consecutivos  
**Para** motivarme a usar la app diariamente

**Criterios de Aceptación**:

- [ ] Mostrar contador de racha en perfil
- [ ] Ícono de fuego 🔥 junto al número
- [ ] Actualizar racha al completar primer reto del día
- [ ] Resetear si no hay actividad en 24h

**Estimación**: 1.5 horas  
**Prioridad**: P2

**Tareas técnicas**:

- Implementar función `update_streak()` de Supabase
- Llamar al completar reto
- Mostrar en perfil

---

### 🔵 OPCIONAL - DÍA 2 TARDE (Si hay tiempo)

#### Sprint 2.4: PWA y Deploy (2-3 horas)

**Responsable Sugerido**: Desarrollador 1

---

#### **US-016: Configurar PWA Básica**

**Como** usuario  
**Quiero** poder instalar la app en mi móvil  
**Para** acceder rápidamente como una app nativa

**Criterios de Aceptación**:

- [ ] Archivo `manifest.json` configurado
- [ ] Ícono de app (512x512 y 192x192)
- [ ] Service Worker básico (cache estático)
- [ ] Instalable desde navegador móvil

**Estimación**: 1.5 horas  
**Prioridad**: P2

**Tareas técnicas**:

- Crear `public/manifest.json`
- Generar iconos con herramienta online
- Plugin de Vite para PWA: `vite-plugin-pwa`

---

#### **US-017: Deploy en Vercel**

**Como** equipo  
**Queremos** tener la app desplegada públicamente  
**Para** presentarla en el hackathon

**Criterios de Aceptación**:

- [ ] Repo en GitHub actualizado
- [ ] Proyecto conectado a Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] Build exitoso
- [ ] URL pública funcionando

**Estimación**: 1 hora  
**Prioridad**: P1

---

#### Sprint 2.5: Pulido y UX (2-3 horas)

**Responsable Sugerido**: Desarrollador 2

---

#### **US-018: Mejoras Visuales y Animaciones**

**Como** usuario  
**Quiero** una interfaz atractiva y fluida  
**Para** disfrutar usando la app

**Criterios de Aceptación**:

- [ ] Animaciones al ganar XP (confetti/celebración simple)
- [ ] Transiciones suaves entre pantallas
- [ ] Loading states en todas las peticiones
- [ ] Toasts para notificaciones (éxito/error)
- [ ] Colores consistentes con tema ecológico

**Estimación**: 2 horas  
**Prioridad**: P2

**Tareas técnicas**:

- Usar biblioteca de animaciones (Framer Motion o CSS)
- Implementar toast library (react-hot-toast)
- Refinar estilos con Tailwind

---

#### **US-019: Página de Inicio/Landing**

**Como** visitante no autenticado  
**Quiero** ver una página de bienvenida atractiva  
**Para** entender qué es EcoQuest

**Criterios de Aceptación**:

- [ ] Hero section con título y descripción
- [ ] Botones "Registrarse" e "Iniciar Sesión"
- [ ] Sección de características principales
- [ ] Diseño responsive

**Estimación**: 1.5 horas  
**Prioridad**: P2

---

### 🟢 DESCARTADO PARA HACKATHON (Fase 2 - Post-hackathon)

Estas historias son valiosas pero no críticas para el MVP de 2 días:

#### ~~US-020: Artículos Educativos~~

- Demasiado contenido por crear
- **Alternativa**: Link a recursos externos

#### ~~US-021: Sistema de Logros/Insignias~~

- Nice to have pero no crítico
- **Alternativa**: Mostrar solo XP y nivel

#### ~~US-022: Avatar Personalizable~~

- Consume mucho tiempo de UI
- **Alternativa**: Avatar por defecto con iniciales

#### ~~US-023: Retos Drag & Drop~~

- Complejidad técnica alta
- **Alternativa**: Solo multiple choice

#### ~~US-024: Modo Offline Completo~~

- Requiere configuración compleja de Service Worker
- **Alternativa**: PWA básica con cache

---

## 📊 Resumen de Estimaciones

### Día 1 - Sábado (14-16 horas)

| Sprint          | Historias              | Horas   | Responsable   |
| --------------- | ---------------------- | ------- | ------------- |
| 1.1 Setup       | US-001, US-002         | 2.5h    | Dev 1 + Dev 2 |
| 1.2 Auth        | US-003, US-004, US-005 | 3h      | Dev 2         |
| 1.3 Layout      | US-006                 | 1.5h    | Dev 1         |
| 1.4 Aprendizaje | US-007, US-008, US-009 | 5h      | Ambos         |
| **TOTAL**       | **9 historias**        | **12h** |               |

### Día 2 - Domingo (14-16 horas)

| Sprint       | Historias        | Horas   | Responsable |
| ------------ | ---------------- | ------- | ----------- |
| 2.1 Perfil   | US-010, US-011   | 3h      | Dev 2       |
| 2.2 Ranking  | US-012, US-013   | 3h      | Dev 1       |
| 2.3 Features | US-014, US-015   | 3h      | Ambos       |
| 2.4 Deploy   | US-016, US-017   | 2.5h    | Dev 1       |
| 2.5 Pulido   | US-018, US-019   | 3.5h    | Dev 2       |
| **TOTAL**    | **10 historias** | **15h** |             |

### **GRAN TOTAL**: 19 historias | ~27 horas

---

## 🎯 Definition of Done (DoD)

Una historia se considera "Hecha" cuando:

- ✅ Código implementado y funcional
- ✅ Probado manualmente (happy path + edge cases)
- ✅ Responsive en móvil y desktop
- ✅ Sin errores en consola
- ✅ Commiteado a Git con mensaje descriptivo
- ✅ Integrado con el resto del código (no rompe otras features)

---

## 🚨 Riesgos y Mitigaciones

| Riesgo                 | Probabilidad | Impacto | Mitigación                                    |
| ---------------------- | ------------ | ------- | --------------------------------------------- |
| Problemas con Supabase | Media        | Alto    | Tener backup de queries, documentación a mano |
| Scope creep            | Alta         | Alto    | **RESPETAR EL BACKLOG**, no agregar features  |
| Bugs de última hora    | Media        | Medio   | Buffer de 2h al final del día 2               |
| Problemas de deploy    | Baja         | Alto    | Deploy temprano (tarde del día 2)             |
| Cansancio/burnout      | Media        | Medio   | Breaks de 15min cada 2h, dormir bien          |

---

## 📝 Notas Importantes

### Decisiones de Diseño para Optimizar Tiempo:

1. **Solo retos de opción múltiple** (no drag & drop)
2. **3 categorías iniciales** (no 5)
3. **Avatar por defecto** (no personalizable)
4. **Sin biblioteca de artículos** (solo retos)
5. **PWA básica** (no modo offline completo)
6. **Regeneración de vidas simplificada** (no automática cada 30 min)

### Herramientas Recomendadas:

- **UI Components**: Headless UI / Radix UI (para modals, dropdowns)
- **Icons**: Lucide React / Heroicons
- **Animations**: Framer Motion (opcional, solo si hay tiempo)
- **Toasts**: react-hot-toast
- **Forms**: React Hook Form (simplifica validaciones)

### División del Trabajo Sugerida:

**Desarrollador 1** (Backend/Lógica):

- Setup de Supabase
- Sistema de retos y progreso
- Ranking con Realtime
- Deploy

**Desarrollador 2** (Frontend/UI):

- Autenticación UI
- Layout y navegación
- Perfil de usuario
- Pulido visual

**Ambos**:

- Code review mutuo
- Testing
- Preparación de presentación (última hora del domingo)

---

## 🎉 Objetivo Final - Domingo 26 Oct 18:00

**Tener desplegado y funcionando:**

✅ Registro e inicio de sesión  
✅ 3 categorías con 15 retos totales  
✅ Sistema de XP y niveles  
✅ Perfil personal con estadísticas  
✅ Ranking global en tiempo real  
✅ Sistema de vidas  
✅ Racha diaria  
✅ PWA instalable  
✅ Deploy público en Vercel  
✅ Presentación lista (slides + demo)

---

**Fecha de creación**: 24 de octubre de 2025  
**Versión**: 1.0  
**Sprint**: Hackathon 2 días  
**Team**: 2 developers 🚀

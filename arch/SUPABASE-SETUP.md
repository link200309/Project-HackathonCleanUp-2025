# 🗄️ Guía de Configuración de Supabase - EcoQuest

> **🚀 VERSIÓN SIMPLIFICADA PARA HACKATHON (2 días)**  
> Esta guía ha sido optimizada para implementación rápida, removiendo features no esenciales.

## ✨ Características del Esquema Simplificado

### ✅ Incluido (Core Features):

- **Autenticación**: Email/Password con Supabase Auth
- **Challenges**: 12 retos con categorías de reciclaje de Bolivia
- **Sistema XP & Niveles**: 4 niveles (Bronce → Plata → Oro → Verde Legendario)
- **Rachas (Streaks)**: Sistema de días consecutivos
- **Ranking en Tiempo Real**: Top 100 usuarios por XP
- **Artículos Educativos**: 3 artículos informativos sobre reciclaje
- **Progreso de Usuario**: Tracking de retos completados

### ❌ Removido (No Esencial):

- ~~Sistema de Vidas (Lives)~~ - Simplificación de mecánica
- ~~Logros/Achievements~~ - Reduce complejidad
- ~~Quizzes de Artículos~~ - Artículos solo informativos
- ~~Avatares Personalizados~~ - Solo emojis predefinidos (🌱, 🌿, 🌳)
- ~~Múltiples Buckets Storage~~ - Solo article-images (opcional)

### 📊 Base de Datos Final:

**6 Tablas Esenciales**:

1. `users` - Perfiles de usuario
2. `user_stats` - XP, nivel, rachas
3. `challenges` - Retos de reciclaje
4. `user_progress` - Respuestas y progreso
5. `articles` - Contenido educativo
6. `user_favorites` - Favoritos (opcional)

---

## 📑 Índice

1. [Creación del Proyecto](#1-creación-del-proyecto)
2. [Configuración de Autenticación](#2-configuración-de-autenticación)
3. [Estructura de Base de Datos](#3-estructura-de-base-de-datos)
4. [Row Level Security (RLS)](#4-row-level-security-rls)
5. [Storage (Almacenamiento)](#5-storage-almacenamiento)
6. [Realtime](#6-realtime)
7. [Variables de Entorno](#7-variables-de-entorno)
8. [Funciones y Triggers](#8-funciones-y-triggers)

---

## 1. Creación del Proyecto

### Paso 1.1: Crear cuenta y proyecto

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Click en "New Project"
4. Completa los datos:
   - **Name**: `ecoquest` o `ecoquest-prod`
   - **Database Password**: (guarda esta contraseña de forma segura)
   - **Region**: Selecciona la más cercana a tu ubicación
   - **Pricing Plan**: Free tier (suficiente para el proyecto)
5. Click en "Create new project"
6. Espera 2-3 minutos mientras se aprovisiona

### Paso 1.2: Obtener las credenciales

Una vez creado el proyecto, ve a **Settings → API** y copia:

- `Project URL` (ej: https://xxxxx.supabase.co)
- `anon public` key
- `service_role` key (solo para backend si es necesario)

---

## 2. Configuración de Autenticación

### Paso 2.1: Habilitar Email/Password

1. Ve a **Authentication → Providers**
2. En "Email", asegúrate que esté **habilitado**
3. Configuración recomendada:
   - ✅ Enable email confirmations (opcional para desarrollo)
   - ✅ Enable password strength checks
   - Minimum password length: **6 caracteres**

### Paso 2.2: Configurar Email Templates (Opcional)

1. Ve a **Authentication → Email Templates**
2. Personaliza los templates:
   - **Confirm signup**: Email de confirmación
   - **Reset password**: Recuperación de contraseña
   - **Magic Link**: Login sin contraseña (opcional)

### Paso 2.3: Habilitar Proveedores Sociales (Opcional - Fase 2)

Para Google OAuth:

1. Ve a **Authentication → Providers**
2. Click en **Google**
3. Ingresa:
   - Client ID (de Google Cloud Console)
   - Client Secret
4. Guarda los cambios

---

## 3. Estructura de Base de Datos

### Paso 3.1: Crear las tablas

Ve a **SQL Editor** y ejecuta los siguientes scripts:

#### 📋 Script 1: Tabla `users` (extendida de auth.users)

```sql
-- Tabla de perfiles de usuario (extiende auth.users)
-- SIMPLIFICADO: Solo avatar_icon, sin color ni frame
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  city TEXT,
  eco_motto TEXT CHECK (char_length(eco_motto) <= 50),
  avatar_icon TEXT DEFAULT '🌱', -- Emoji por defecto
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsqueda rápida
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_users_email ON public.users(email);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### 📊 Script 2: Tabla `user_stats`

```sql
-- Estadísticas de usuario
-- SIMPLIFICADO: Sin sistema de vidas (lives)
CREATE TABLE public.user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_xp INTEGER DEFAULT 0 CHECK (total_xp >= 0),
  current_level TEXT DEFAULT 'Bronce' CHECK (current_level IN ('Bronce', 'Plata', 'Oro', 'Verde Legendario')),
  current_streak INTEGER DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak INTEGER DEFAULT 0 CHECK (longest_streak >= 0),
  challenges_completed INTEGER DEFAULT 0 CHECK (challenges_completed >= 0),
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_user_stats_user_id ON public.user_stats(user_id);
CREATE INDEX idx_user_stats_total_xp ON public.user_stats(total_xp DESC); -- Para ranking

-- Trigger para updated_at
CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON public.user_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### 🎯 Script 3: Tabla `challenges`

```sql
-- Retos/Desafíos
-- TIPOS: multiple_choice y drag_and_drop
-- Categorías de Bolivia: orgánico, plástico, papel-cartón, vidrio, metal, no-reciclable
CREATE TABLE public.challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('organico', 'plastico', 'papel-carton', 'vidrio', 'metal', 'no-reciclable')),
  difficulty_level INTEGER NOT NULL CHECK (difficulty_level BETWEEN 1 AND 5),
  type TEXT NOT NULL CHECK (type IN ('multiple_choice', 'drag_and_drop')),
  question TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  options JSONB NOT NULL, -- Array de opciones (para multiple_choice) o items a clasificar (para drag_and_drop)
  explanation TEXT NOT NULL, -- Feedback educativo
  xp_reward INTEGER DEFAULT 10 CHECK (xp_reward >= 0),
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_challenges_category ON public.challenges(category);
CREATE INDEX idx_challenges_difficulty ON public.challenges(difficulty_level);
CREATE INDEX idx_challenges_active ON public.challenges(is_active);

-- Trigger
CREATE TRIGGER update_challenges_updated_at
  BEFORE UPDATE ON public.challenges
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Datos de ejemplo según clasificación de Bolivia
INSERT INTO public.challenges (category, difficulty_level, type, question, correct_answer, options, explanation, xp_reward) VALUES
-- Categoría: Orgánico
('organico', 1, 'multiple_choice', '¿Cuál de estos residuos es orgánico?', 'Cáscara de plátano',
  '["Cáscara de plátano", "Botella de plástico", "Lata de aluminio", "Papel de aluminio"]'::jsonb,
  'Las cáscaras de frutas son residuos orgánicos que se pueden compostar y convertir en abono natural.', 10),

('organico', 1, 'multiple_choice', '¿Qué residuo va en el contenedor MARRÓN (orgánico)?', 'Restos de comida',
  '["Restos de comida", "Botellas de vidrio", "Envases de yogurt", "Periódicos"]'::jsonb,
  'Los restos de comida, cáscaras y residuos de jardín van en el contenedor marrón de orgánicos.', 10),

-- Categoría: Plástico
('plastico', 2, 'multiple_choice', '¿Qué tipo de plástico es más fácil de reciclar?', 'PET (botellas)',
  '["PVC (tuberías)", "PET (botellas)", "Plástico de un solo uso", "Bolsas plásticas"]'::jsonb,
  'El PET de las botellas es el plástico más reciclado en Bolivia. Busca el símbolo con el número 1.', 15),

('plastico', 2, 'multiple_choice', '¿En qué contenedor va una botella de plástico VACÍA y LIMPIA?', 'Amarillo (reciclables)',
  '["Verde (vidrio)", "Amarillo (reciclables)", "Marrón (orgánico)", "Negro (no reciclable)"]'::jsonb,
  'Las botellas de plástico limpias van en el contenedor AMARILLO junto con otros envases reciclables.', 15),

-- Categoría: Papel y Cartón
('papel-carton', 2, 'multiple_choice', '¿El papel sucio con aceite o grasa se puede reciclar?', 'No',
  '["Sí, siempre", "No", "Solo si se lava", "Depende del tipo de grasa"]'::jsonb,
  'El papel contaminado con grasa NO se puede reciclar. Debe ir al contenedor de no reciclables (negro).', 15),

('papel-carton', 1, 'multiple_choice', '¿Dónde va una caja de cartón limpia y aplastada?', 'Contenedor amarillo',
  '["Contenedor negro", "Contenedor amarillo", "Contenedor marrón", "Contenedor verde"]'::jsonb,
  'Las cajas de cartón limpias se reciclan en el contenedor AMARILLO. Recuerda aplastarlas para ahorrar espacio.', 10),

-- Categoría: Vidrio
('vidrio', 3, 'multiple_choice', '¿Cuántas veces se puede reciclar el vidrio?', 'Infinitas veces',
  '["1 vez", "5 veces", "10 veces", "Infinitas veces"]'::jsonb,
  'El vidrio se puede reciclar infinitas veces sin perder calidad. ¡Es uno de los materiales más sostenibles!', 20),

('vidrio', 2, 'multiple_choice', '¿Qué se debe hacer antes de reciclar botellas de vidrio?', 'Enjuagarlas',
  '["Romperlas", "Enjuagarlas", "Quitarles la etiqueta", "Pintarlas de verde"]'::jsonb,
  'Debes enjuagar las botellas de vidrio antes de reciclarlas para evitar malos olores y contaminación.', 15),

-- Categoría: Metal
('metal', 3, 'multiple_choice', '¿Las latas de aluminio se pueden reciclar?', 'Sí, siempre',
  '["No", "Sí, siempre", "Solo las de refresco", "Solo si están nuevas"]'::jsonb,
  'Las latas de aluminio son 100% reciclables. En Bolivia, reciclarlas ahorra energía y recursos naturales.', 20),

('metal', 2, 'multiple_choice', '¿En qué contenedor van las latas de aluminio?', 'Amarillo',
  '["Verde", "Amarillo", "Marrón", "Negro"]'::jsonb,
  'Las latas de aluminio (refrescos, conservas) van en el contenedor AMARILLO de reciclables.', 15),

-- Categoría: No Reciclable
('no-reciclable', 2, 'multiple_choice', '¿Qué residuo NO es reciclable?', 'Pañales usados',
  '["Botellas de vidrio", "Latas de aluminio", "Pañales usados", "Papel limpio"]'::jsonb,
  'Los pañales usados, toallas sanitarias y residuos sanitarios van al contenedor NEGRO (no reciclables).', 15),

('no-reciclable', 3, 'multiple_choice', '¿Los CD y DVD viejos son reciclables en el sistema común?', 'No',
  '["Sí", "No", "Solo los CD", "Solo los DVD"]'::jsonb,
  'Los CD y DVD requieren reciclaje especial. En Bolivia, llévalos a puntos de acopio especializados.', 20);
```

#### ✅ Script 4: Tabla `user_progress`

```sql
-- Progreso de usuario en retos
CREATE TABLE public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  is_correct BOOLEAN DEFAULT false,
  attempts INTEGER DEFAULT 1 CHECK (attempts > 0),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Un usuario no puede tener múltiples registros del mismo reto
  UNIQUE(user_id, challenge_id)
);

-- Índices
CREATE INDEX idx_user_progress_user ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_challenge ON public.user_progress(challenge_id);
CREATE INDEX idx_user_progress_completed ON public.user_progress(is_completed);
```

#### 📚 Script 5: Tabla `articles` (SIMPLIFICADO - Sin quizzes)

```sql
-- Artículos educativos informativos
-- SIMPLIFICADO: Solo información, sin quizzes asociados
CREATE TABLE public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('compostaje', 'reciclaje', 'contaminacion', 'consejos')),
  summary TEXT, -- Resumen breve
  image_url TEXT,
  reading_time INTEGER DEFAULT 5, -- minutos estimados
  author TEXT DEFAULT 'EcoQuest Team',
  views_count INTEGER DEFAULT 0 CHECK (views_count >= 0),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_articles_category ON public.articles(category);
CREATE INDEX idx_articles_published ON public.articles(is_published);
CREATE INDEX idx_articles_views ON public.articles(views_count DESC);

-- Trigger
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Artículos de ejemplo sobre reciclaje en Bolivia
INSERT INTO public.articles (title, summary, content, category, reading_time) VALUES
('Separación de Residuos en Bolivia',
 'Guía básica de colores de contenedores',
 'En Bolivia se utiliza un sistema de contenedores de colores:\n\n🟤 MARRÓN: Residuos orgánicos (restos de comida, cáscaras, residuos de jardín)\n🟡 AMARILLO: Reciclables (plástico, metal, papel, cartón)\n🟢 VERDE: Vidrio\n⚫ NEGRO: No reciclables\n\nEs importante limpiar los envases antes de reciclarlos y aplastar las cajas de cartón.',
 'reciclaje', 3),

('¿Qué es el Compostaje?',
 'Convierte tus residuos orgánicos en abono',
 'El compostaje es un proceso natural que transforma residuos orgánicos en abono nutritivo para plantas.\n\n¿Qué se puede compostar?\n✅ Cáscaras de frutas y verduras\n✅ Restos de café y té\n✅ Hojas secas\n✅ Residuos de jardín\n\n❌ NO compostar:\n- Carne ni huesos\n- Lácteos\n- Aceites\n- Residuos de mascotas',
 'compostaje', 5),

('Impacto de los Plásticos',
 'Cómo afectan al medio ambiente',
 'Los plásticos tardan cientos de años en degradarse. En Bolivia, solo el 10% del plástico se recicla.\n\nConsejos para reducir plásticos:\n1. Usa botellas reutilizables\n2. Lleva bolsas de tela al mercado\n3. Evita sorbetes plásticos\n4. Compra productos con menos empaque\n5. Reutiliza envases cuando sea posible',
 'contaminacion', 4);
```

#### ⭐ Script 6: Tabla `user_favorites` (OPCIONAL)

```sql
-- Artículos favoritos
-- SIMPLIFICADO: Tabla opcional para hackathon, solo si hay tiempo
CREATE TABLE public.user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Un usuario no puede marcar el mismo artículo como favorito múltiples veces
  UNIQUE(user_id, article_id)
);

-- Índices
CREATE INDEX idx_user_favorites_user ON public.user_favorites(user_id);
CREATE INDEX idx_user_favorites_article ON public.user_favorites(article_id);
```

---

## 4. Row Level Security (RLS) - SIMPLIFICADO

### ⚠️ ¿Por qué RLS?

Row Level Security asegura que los usuarios solo puedan acceder a sus propios datos.

### Paso 4.1: Habilitar RLS en todas las tablas

```sql
-- Habilitar RLS (solo tablas esenciales)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
```

### Paso 4.2: Políticas de Seguridad

#### Políticas para `users`

```sql
-- Los usuarios pueden leer todos los perfiles (para ranking)
CREATE POLICY "Users can view all profiles"
  ON public.users FOR SELECT
  USING (true);

-- Los usuarios solo pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Los usuarios pueden insertar su propio perfil
CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);
```

#### Políticas para `user_stats`

```sql
-- Los usuarios pueden ver todas las estadísticas (para ranking)
CREATE POLICY "Stats are viewable by everyone"
  ON public.user_stats FOR SELECT
  USING (true);

-- Los usuarios solo pueden actualizar sus propias estadísticas
CREATE POLICY "Users can update own stats"
  ON public.user_stats FOR UPDATE
  USING (auth.uid() = user_id);

-- Los usuarios pueden insertar sus propias estadísticas
CREATE POLICY "Users can insert own stats"
  ON public.user_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### Políticas para `challenges`

```sql
-- Todos pueden leer los retos activos
CREATE POLICY "Challenges are viewable by everyone"
  ON public.challenges FOR SELECT
  USING (is_active = true);
```

#### Políticas para `user_progress`

```sql
-- Los usuarios pueden ver su propio progreso
CREATE POLICY "Users can view own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Los usuarios pueden insertar su propio progreso
CREATE POLICY "Users can insert own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Los usuarios pueden actualizar su propio progreso
CREATE POLICY "Users can update own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

#### Políticas para `articles`

```sql
-- Todos pueden leer artículos publicados
CREATE POLICY "Published articles are viewable by everyone"
  ON public.articles FOR SELECT
  USING (is_published = true);

-- Todos pueden actualizar el contador de vistas (necesario para analytics)
CREATE POLICY "Anyone can update article views"
  ON public.articles FOR UPDATE
  USING (true)
  WITH CHECK (true);
```

#### Políticas para `article_quizzes`

```sql
-- Todos pueden leer los quizzes
CREATE POLICY "Quizzes are viewable by everyone"
  ON public.article_quizzes FOR SELECT
  USING (true);
```

#### Políticas para `user_favorites`

```sql
-- Los usuarios pueden ver sus propios favoritos
CREATE POLICY "Users can view own favorites"
  ON public.user_favorites FOR SELECT
  USING (auth.uid() = user_id);

-- Los usuarios pueden insertar sus propios favoritos
CREATE POLICY "Users can insert own favorites"
  ON public.user_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Los usuarios pueden eliminar sus propios favoritos
CREATE POLICY "Users can delete own favorites"
  ON public.user_favorites FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 5. Storage (Almacenamiento) - SIMPLIFICADO

### ⚠️ Simplificación para Hackathon

Para el prototipo, los avatares serán EMOJIS (🌱, 🌿, 🌳, etc.) almacenados como texto.
Solo necesitamos un bucket para imágenes de artículos (opcional).

### Paso 5.1: Crear Bucket (OPCIONAL)

Ve a **Storage** y crea el siguiente bucket solo si hay tiempo:

#### Bucket: `article-images` (OPCIONAL)

```
Nombre: article-images
Público: ✅ Sí
```

**Políticas de Storage para article-images:**

```sql
-- Todos pueden ver imágenes de artículos
CREATE POLICY "Article images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'article-images');

-- Permitir subir imágenes (para desarrollo)
CREATE POLICY "Anyone can upload article images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'article-images');
```

---

## 6. Realtime - SIMPLIFICADO

### Paso 6.1: Habilitar Realtime para Ranking

```sql
-- Habilitar publicación de cambios en user_stats para ranking en vivo
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_stats;
```

### Paso 6.2: Configurar desde el Dashboard

1. Ve a **Database → Replication**
2. Asegúrate que `user_stats` esté en la lista de tablas replicadas
3. Esto permite que el ranking se actualice en tiempo real

---

## 7. Variables de Entorno

### Archivo `.env` en el proyecto frontend

Crea un archivo `.env` en la raíz del proyecto React:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui

# App Configuration
VITE_APP_NAME=EcoQuest
VITE_APP_VERSION=1.0.0
```

### Archivo `.env.example` (para el repositorio)

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# App Configuration
VITE_APP_NAME=EcoQuest
VITE_APP_VERSION=1.0.0
```

### ⚠️ Importante

- Añade `.env` al `.gitignore`
- Nunca subas las keys reales a GitHub
- Usa las variables de entorno en Vercel para producción

---

## 8. Funciones y Triggers - SIMPLIFICADO

### Función 1: Actualizar nivel del usuario automáticamente

```sql
-- Función para calcular y actualizar el nivel basado en XP
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  -- SIMPLIFICADO: 4 niveles básicos para hackathon
  IF NEW.total_xp >= 6000 THEN
    NEW.current_level := 'Verde Legendario';
  ELSIF NEW.total_xp >= 3000 THEN
    NEW.current_level := 'Oro';
  ELSIF NEW.total_xp >= 1000 THEN
    NEW.current_level := 'Plata';
  ELSE
    NEW.current_level := 'Bronce';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger que ejecuta la función antes de actualizar user_stats
CREATE TRIGGER auto_update_user_level
  BEFORE UPDATE OF total_xp ON public.user_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_user_level();
```

### Función 2: Actualizar racha diaria

```sql
-- Función para actualizar racha cuando el usuario completa actividad
CREATE OR REPLACE FUNCTION update_streak(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_last_activity DATE;
  v_current_streak INTEGER;
BEGIN
  SELECT last_activity_date, current_streak INTO v_last_activity, v_current_streak
  FROM public.user_stats
  WHERE user_id = p_user_id;

  -- Si es el primer día de actividad
  IF v_last_activity IS NULL THEN
    UPDATE public.user_stats
    SET current_streak = 1, longest_streak = 1, last_activity_date = CURRENT_DATE
    WHERE user_id = p_user_id;

  -- Si la actividad es del día siguiente
  ELSIF v_last_activity = CURRENT_DATE - INTERVAL '1 day' THEN
    UPDATE public.user_stats
    SET
      current_streak = current_streak + 1,
      longest_streak = GREATEST(longest_streak, current_streak + 1),
      last_activity_date = CURRENT_DATE
    WHERE user_id = p_user_id;

  -- Si ya hubo actividad hoy, no hacer nada
  ELSIF v_last_activity = CURRENT_DATE THEN
    -- No actualizar
    NULL;

  -- Si se rompió la racha
  ELSE
    UPDATE public.user_stats
    SET current_streak = 1, last_activity_date = CURRENT_DATE
    WHERE user_id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Nota: Esta función se debe llamar desde el frontend cuando el usuario completa un challenge
```

### Función 3: Crear perfil automáticamente al registrarse (SIMPLIFICADO)

```sql
-- SIMPLIFICADO: Solo crea users y user_stats
-- Función para crear automáticamente user y user_stats cuando se registra un usuario
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insertar en users
  INSERT INTO public.users (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );

  -- Insertar en user_stats
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger en auth.users (tabla del sistema de Supabase)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
```

---

## 9. Queries Útiles para el Frontend

### Query 1: Obtener ranking global (Top 100)

```sql
SELECT
  u.id,
  u.username,
  u.avatar_icon,
  u.avatar_color,
  u.city,
  us.total_xp,
  us.current_level,
  ROW_NUMBER() OVER (ORDER BY us.total_xp DESC) as rank
FROM public.users u
JOIN public.user_stats us ON u.id = us.user_id
ORDER BY us.total_xp DESC
LIMIT 100;
```

### Query 2: Obtener perfil completo de usuario (SIMPLIFICADO)

```sql
SELECT
  u.*,
  us.total_xp,
  us.current_level,
  us.current_streak,
  us.longest_streak,
  us.challenges_completed,
  (SELECT COUNT(*) FROM public.users u2 JOIN public.user_stats us2 ON u2.id = us2.user_id WHERE us2.total_xp > us.total_xp) + 1 as global_rank
FROM public.users u
JOIN public.user_stats us ON u.id = us.user_id
WHERE u.id = 'user-uuid-here';
```

### Query 3: Obtener retos de una categoría

```sql
SELECT *
FROM public.challenges
WHERE category = 'organico' AND is_active = true
ORDER BY difficulty_level ASC;
```

---

## 10. Checklist de Configuración - SIMPLIFICADO

### Esenciales para Hackathon

- [ ] Proyecto Supabase creado
- [ ] Credenciales copiadas (URL y anon key)
- [ ] Autenticación de email/password habilitada
- [ ] Tablas esenciales creadas (6 tablas: users, user_stats, challenges, user_progress, articles, user_favorites)
- [ ] RLS habilitado en las 6 tablas
- [ ] Políticas de seguridad aplicadas
- [ ] Realtime habilitado para user_stats (ranking)
- [ ] Función update_user_level creada
- [ ] Trigger auto_update_user_level creado
- [ ] Datos de ejemplo insertados (12 challenges, 3 articles)
- [ ] Variables de entorno configuradas en el proyecto
- [ ] Prueba de conexión exitosa desde el frontend

### Opcionales (Solo si hay tiempo)

- [ ] Bucket article-images creado
- [ ] Tabla user_favorites implementada
- [ ] Artículos adicionales agregados

---

## 11. Próximos Pasos

1. **El cliente de Supabase ya está configurado** en `frontend/src/lib/supabaseClient.js` ✅

2. **La autenticación ya está implementada** con:

   - `AuthContext` para estado global
   - `RegisterForm` y `LoginForm`
   - Rutas protegidas en `App.jsx`

3. **Siguiente paso: Crear hooks para challenges**

   Ejemplo: `frontend/src/features/challenges/hooks/useChallenges.js`

   ```javascript
   import { useState, useEffect } from "react";
   import { supabase } from "@/lib/supabaseClient";

   export function useChallenges(category = null) {
     const [challenges, setChallenges] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
       async function fetchChallenges() {
         try {
           let query = supabase
             .from("challenges")
             .select("*")
             .eq("is_active", true);

           if (category) {
             query = query.eq("category", category);
           }

           const { data, error } = await query.order("difficulty_level");

           if (error) throw error;
           setChallenges(data);
         } catch (err) {
           setError(err.message);
         } finally {
           setLoading(false);
         }
       }

       fetchChallenges();
     }, [category]);

     return { challenges, loading, error };
   }
   ```

4. **Crear hook para ranking** (`hooks/useRanking.js`)

5. **Implementar sistema de progreso** (guardar respuestas en `user_progress`)

---

## 📞 Soporte

- **Documentación oficial**: [https://supabase.com/docs](https://supabase.com/docs)
- **Discord de Supabase**: [https://discord.supabase.com](https://discord.supabase.com)
- **GitHub Issues**: Para reportar bugs

---

## 📋 Resumen de Simplificaciones para Hackathon

### ❌ Eliminado:

- Sistema de vidas (lives) y regeneración
- Logros/Achievements completos
- Quizzes de artículos
- Personalización de avatar (color/frame)
- Múltiples buckets de Storage

### ✅ Mantenido (Esencial):

- Autenticación (email/password)
- Challenges con 6 categorías de Bolivia
- Sistema de XP y niveles
- Rachas (streaks)
- Ranking en tiempo real
- Artículos informativos básicos
- Progreso de usuario

### 🎯 Base de Datos Final:

**6 Tablas**: users, user_stats, challenges, user_progress, articles, user_favorites

### 💡 Ventajas:

- Menos código = Menos bugs
- Más rápido de implementar
- Enfocado en features core
- Fácil de expandir después del hackathon

---

**Última actualización**: 24 de octubre de 2025  
**Versión**: 2.0 - SIMPLIFICADO PARA HACKATHON  
**Proyecto**: EcoQuest - Gamificación de Reciclaje en Bolivia

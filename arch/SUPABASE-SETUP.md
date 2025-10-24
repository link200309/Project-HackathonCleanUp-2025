# 🗄️ Guía de Configuración de Supabase - EcoQuest

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
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  city TEXT,
  eco_motto TEXT CHECK (char_length(eco_motto) <= 50),
  avatar_icon TEXT DEFAULT 'default-avatar',
  avatar_color TEXT DEFAULT '#10B981',
  avatar_frame TEXT DEFAULT 'basic',
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
CREATE TABLE public.user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_xp INTEGER DEFAULT 0 CHECK (total_xp >= 0),
  current_level TEXT DEFAULT 'Bronce' CHECK (current_level IN ('Bronce', 'Plata', 'Oro', 'Verde Legendario')),
  current_streak INTEGER DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak INTEGER DEFAULT 0 CHECK (longest_streak >= 0),
  lives INTEGER DEFAULT 5 CHECK (lives >= 0 AND lives <= 5),
  challenges_completed INTEGER DEFAULT 0 CHECK (challenges_completed >= 0),
  last_activity_date DATE,
  last_life_regen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
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
CREATE TABLE public.challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('organicos', 'plasticos', 'papel', 'vidrio', 'peligrosos')),
  difficulty_level INTEGER NOT NULL CHECK (difficulty_level BETWEEN 1 AND 5),
  type TEXT NOT NULL CHECK (type IN ('drag_drop', 'multiple_choice', 'true_false', 'identification')),
  question TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  options JSONB, -- Array de opciones para multiple choice
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

-- Datos de ejemplo (ejecutar después)
INSERT INTO public.challenges (category, difficulty_level, type, question, correct_answer, options, explanation, xp_reward) VALUES
('organicos', 1, 'multiple_choice', '¿Cuál de estos residuos es orgánico?', 'Cáscara de plátano',
  '["Cáscara de plátano", "Botella de plástico", "Lata de aluminio", "Papel de aluminio"]'::jsonb,
  'Las cáscaras de frutas son residuos orgánicos que pueden compostar y convertirse en abono natural.', 10),

('plasticos', 2, 'multiple_choice', '¿Qué tipo de plástico es más fácil de reciclar?', 'PET (tipo 1)',
  '["PVC (tipo 3)", "PET (tipo 1)", "PS (tipo 6)", "Otros (tipo 7)"]'::jsonb,
  'El PET (Polietileno Tereftalato) marcado con el número 1 es el plástico más comúnmente reciclado, usado en botellas.', 15),

('papel', 2, 'true_false', 'El papel con grasa de pizza puede reciclarse sin problemas.', 'Falso',
  '["Verdadero", "Falso"]'::jsonb,
  'El papel contaminado con grasa no puede reciclarse porque la grasa interfiere con el proceso de reciclaje. Debe ir a basura común.', 15),

('vidrio', 3, 'multiple_choice', '¿Cuántas veces puede reciclarse el vidrio?', 'Infinitas veces',
  '["1 vez", "5 veces", "10 veces", "Infinitas veces"]'::jsonb,
  'El vidrio puede reciclarse infinitas veces sin perder calidad. Es uno de los materiales más sostenibles.', 20),

('peligrosos', 4, 'multiple_choice', '¿Dónde deben desecharse las pilas usadas?', 'Puntos de recolección especiales',
  '["Basura común", "Reciclaje de plástico", "Puntos de recolección especiales", "Baño/alcantarilla"]'::jsonb,
  'Las pilas contienen metales pesados tóxicos y deben llevarse a puntos de recolección especializados para evitar contaminar el suelo.', 25);
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

#### 🏆 Script 5: Tabla `achievements`

```sql
-- Logros/Insignias
CREATE TABLE public.achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL, -- emoji o nombre de icono
  requirement_type TEXT NOT NULL CHECK (requirement_type IN ('challenges_count', 'streak', 'xp_total', 'perfect_streak', 'category_master')),
  requirement_value INTEGER NOT NULL CHECK (requirement_value > 0),
  xp_bonus INTEGER DEFAULT 0 CHECK (xp_bonus >= 0),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_achievements_type ON public.achievements(requirement_type);

-- Logros iniciales
INSERT INTO public.achievements (name, description, icon, requirement_type, requirement_value, xp_bonus) VALUES
('Primera Misión', 'Completa tu primer reto', '🌱', 'challenges_count', 1, 10),
('Eco Principiante', 'Completa 10 retos', '🌿', 'challenges_count', 10, 50),
('Eco Guerrero', 'Completa 100 retos', '⚔️', 'challenges_count', 100, 200),
('Racha de Fuego', 'Mantén una racha de 7 días', '🔥', 'streak', 7, 100),
('Racha Legendaria', 'Mantén una racha de 30 días', '🏆', 'streak', 30, 500),
('Maestro del Reciclaje', 'Alcanza 1000 XP', '🎓', 'xp_total', 1000, 150),
('Perfeccionista', 'Aciert 50 preguntas seguidas', '💯', 'perfect_streak', 50, 300);
```

#### 🎖️ Script 6: Tabla `user_achievements`

```sql
-- Logros desbloqueados por usuarios
CREATE TABLE public.user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Un usuario no puede desbloquear el mismo logro múltiples veces
  UNIQUE(user_id, achievement_id)
);

-- Índices
CREATE INDEX idx_user_achievements_user ON public.user_achievements(user_id);
CREATE INDEX idx_user_achievements_achievement ON public.user_achievements(achievement_id);
```

#### 📚 Script 7: Tabla `articles`

```sql
-- Artículos educativos
CREATE TABLE public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('compostaje', 'consumo', 'contaminacion', 'energia', 'reciclaje')),
  summary TEXT, -- Resumen breve
  image_url TEXT,
  reading_time INTEGER DEFAULT 5, -- minutos
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
```

#### 📝 Script 8: Tabla `article_quizzes`

```sql
-- Quizzes de artículos
CREATE TABLE public.article_quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  options JSONB NOT NULL, -- Array de opciones
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_article_quizzes_article ON public.article_quizzes(article_id);
```

#### ⭐ Script 9: Tabla `user_favorites`

```sql
-- Artículos favoritos de usuarios
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

## 4. Row Level Security (RLS)

### ⚠️ ¿Por qué RLS?

Row Level Security asegura que los usuarios solo puedan acceder a sus propios datos.

### Paso 4.1: Habilitar RLS en todas las tablas

```sql
-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_quizzes ENABLE ROW LEVEL SECURITY;
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

#### Políticas para `achievements`

```sql
-- Todos pueden ver los logros
CREATE POLICY "Achievements are viewable by everyone"
  ON public.achievements FOR SELECT
  USING (is_active = true);
```

#### Políticas para `user_achievements`

```sql
-- Los usuarios pueden ver todos los logros desbloqueados (para perfiles públicos)
CREATE POLICY "User achievements are viewable by everyone"
  ON public.user_achievements FOR SELECT
  USING (true);

-- Los usuarios solo pueden insertar sus propios logros
CREATE POLICY "Users can insert own achievements"
  ON public.user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);
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

## 5. Storage (Almacenamiento)

### Paso 5.1: Crear Buckets

Ve a **Storage** y crea los siguientes buckets:

#### Bucket 1: `avatars`

```
Nombre: avatars
Público: ✅ Sí (para que las imágenes sean accesibles)
```

**Políticas de Storage para avatars:**

```sql
-- Permitir a todos ver avatares
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Los usuarios pueden subir sus propios avatares
CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Los usuarios pueden actualizar sus propios avatares
CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Los usuarios pueden eliminar sus propios avatares
CREATE POLICY "Users can delete own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

#### Bucket 2: `article-images`

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

-- Solo administradores pueden subir (para desarrollo, permitir a todos)
CREATE POLICY "Anyone can upload article images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'article-images');
```

#### Bucket 3: `challenge-images`

```
Nombre: challenge-images
Público: ✅ Sí
```

**Políticas de Storage para challenge-images:**

```sql
-- Todos pueden ver imágenes de retos
CREATE POLICY "Challenge images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'challenge-images');
```

---

## 6. Realtime

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

## 8. Funciones y Triggers

### Función 1: Actualizar nivel del usuario automáticamente

```sql
-- Función para calcular y actualizar el nivel basado en XP
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  -- Actualizar nivel basado en XP
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

### Función 2: Regenerar vidas automáticamente

```sql
-- Función para regenerar vidas cada 30 minutos
CREATE OR REPLACE FUNCTION regenerate_lives()
RETURNS void AS $$
BEGIN
  UPDATE public.user_stats
  SET
    lives = LEAST(lives + 1, 5),
    last_life_regen = NOW()
  WHERE
    lives < 5
    AND (NOW() - last_life_regen) >= INTERVAL '30 minutes';
END;
$$ LANGUAGE plpgsql;

-- Nota: Esta función debe ejecutarse periódicamente.
-- Opción 1: Usar pg_cron (extensión de PostgreSQL)
-- Opción 2: Llamarla desde el frontend cuando el usuario abra la app
-- Opción 3: Usar un cron job externo
```

### Función 3: Verificar y otorgar logros automáticamente

```sql
-- Función para verificar logros basados en challenges completados
CREATE OR REPLACE FUNCTION check_challenge_achievements(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_challenges_count INTEGER;
  v_achievement_id UUID;
BEGIN
  -- Contar retos completados
  SELECT COUNT(*) INTO v_challenges_count
  FROM public.user_progress
  WHERE user_id = p_user_id AND is_completed = true;

  -- Verificar logro "Primera Misión" (1 reto)
  IF v_challenges_count >= 1 THEN
    SELECT id INTO v_achievement_id FROM public.achievements WHERE name = 'Primera Misión';
    INSERT INTO public.user_achievements (user_id, achievement_id)
    VALUES (p_user_id, v_achievement_id)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;

  -- Verificar logro "Eco Principiante" (10 retos)
  IF v_challenges_count >= 10 THEN
    SELECT id INTO v_achievement_id FROM public.achievements WHERE name = 'Eco Principiante';
    INSERT INTO public.user_achievements (user_id, achievement_id)
    VALUES (p_user_id, v_achievement_id)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;

  -- Verificar logro "Eco Guerrero" (100 retos)
  IF v_challenges_count >= 100 THEN
    SELECT id INTO v_achievement_id FROM public.achievements WHERE name = 'Eco Guerrero';
    INSERT INTO public.user_achievements (user_id, achievement_id)
    VALUES (p_user_id, v_achievement_id)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger para ejecutar la función cuando se completa un reto
CREATE OR REPLACE FUNCTION trigger_check_achievements()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_completed = true AND (OLD.is_completed IS NULL OR OLD.is_completed = false) THEN
    PERFORM check_challenge_achievements(NEW.user_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_achievements_on_progress
  AFTER INSERT OR UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION trigger_check_achievements();
```

### Función 4: Actualizar racha diaria

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
```

### Función 5: Crear perfil automáticamente al registrarse

```sql
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

### Query 2: Obtener perfil completo de usuario

```sql
SELECT
  u.*,
  us.total_xp,
  us.current_level,
  us.current_streak,
  us.longest_streak,
  us.lives,
  us.challenges_completed,
  (SELECT COUNT(*) FROM public.user_achievements WHERE user_id = u.id) as achievements_count,
  (SELECT COUNT(*) FROM public.users u2 JOIN public.user_stats us2 ON u2.id = us2.user_id WHERE us2.total_xp > us.total_xp) + 1 as global_rank
FROM public.users u
JOIN public.user_stats us ON u.id = us.user_id
WHERE u.id = 'user-uuid-here';
```

### Query 3: Obtener retos de una categoría

```sql
SELECT *
FROM public.challenges
WHERE category = 'organicos' AND is_active = true
ORDER BY difficulty_level ASC;
```

### Query 4: Obtener logros desbloqueados de un usuario

```sql
SELECT
  a.id,
  a.name,
  a.description,
  a.icon,
  ua.unlocked_at
FROM public.achievements a
JOIN public.user_achievements ua ON a.id = ua.achievement_id
WHERE ua.user_id = 'user-uuid-here'
ORDER BY ua.unlocked_at DESC;
```

---

## 10. Checklist de Configuración

- [ ] Proyecto Supabase creado
- [ ] Credenciales copiadas (URL y anon key)
- [ ] Autenticación de email/password habilitada
- [ ] Todas las tablas creadas (9 tablas)
- [ ] RLS habilitado en todas las tablas
- [ ] Políticas de seguridad aplicadas
- [ ] Buckets de Storage creados (avatars, article-images, challenge-images)
- [ ] Políticas de Storage configuradas
- [ ] Realtime habilitado para user_stats
- [ ] Funciones y triggers creados
- [ ] Datos de ejemplo insertados (challenges, achievements)
- [ ] Variables de entorno configuradas en el proyecto
- [ ] Prueba de conexión exitosa desde el frontend

---

## 11. Próximos Pasos

1. **Instalar Supabase en el proyecto React:**

   ```bash
   npm install @supabase/supabase-js
   ```

2. **Crear cliente de Supabase** (`src/lib/supabaseClient.js`):

   ```javascript
   import { createClient } from "@supabase/supabase-js";

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```

3. **Implementar autenticación en React**

4. **Crear hooks personalizados para interactuar con Supabase**

---

## 📞 Soporte

- **Documentación oficial**: [https://supabase.com/docs](https://supabase.com/docs)
- **Discord de Supabase**: [https://discord.supabase.com](https://discord.supabase.com)
- **GitHub Issues**: Para reportar bugs

---

**Última actualización**: 24 de octubre de 2025  
**Versión**: 1.0  
**Proyecto**: EcoQuest

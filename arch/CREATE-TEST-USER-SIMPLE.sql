-- ========================================
-- MÉTODO SIMPLE: Crear usuario de prueba
-- ========================================
-- Ejecutar en Supabase SQL Editor
-- Este método es MÁS SIMPLE y RECOMENDADO
-- ========================================

-- PASO 1: Crear usuario usando Dashboard de Supabase
-- Ve a Authentication > Users > Add User
-- Email: test@ecoquest.com
-- Password: test123
-- Auto Confirm User: ✅ SÍ
-- 
-- Copia el UUID del usuario creado y reemplázalo aquí:

DO $$
DECLARE
  test_user_id UUID := 'a38b4a51-d582-4075-9232-ede40561d84a'; -- ⚠️ IMPORTANTE: Cambiar este UUID
BEGIN
  -- Crear perfil en public.users
  INSERT INTO public.users (
    id,
    email,
    username,
    city,
    eco_motto,
    avatar_icon,
    created_at,
    updated_at
  ) VALUES (
    test_user_id,
    'test@ecoquest.com',
    'eco_tester',
    'La Paz',
    'Reciclando por un futuro mejor 🌱',
    '🌳',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    city = EXCLUDED.city,
    eco_motto = EXCLUDED.eco_motto,
    avatar_icon = EXCLUDED.avatar_icon,
    updated_at = NOW();

  -- Crear estadísticas en public.user_stats
  INSERT INTO public.user_stats (
    user_id,
    total_xp,
    current_level,
    current_streak,
    longest_streak,
    challenges_completed,
    last_activity_date,
    created_at,
    updated_at
  ) VALUES (
    test_user_id,
    150,
    'Bronce',
    3,
    5,
    5,
    CURRENT_DATE,
    NOW(),
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_xp = EXCLUDED.total_xp,
    current_level = EXCLUDED.current_level,
    current_streak = EXCLUDED.current_streak,
    longest_streak = EXCLUDED.longest_streak,
    challenges_completed = EXCLUDED.challenges_completed,
    last_activity_date = EXCLUDED.last_activity_date,
    updated_at = NOW();

  RAISE NOTICE 'Usuario de prueba creado exitosamente!';
END $$;

-- ========================================
-- VERIFICACIÓN
-- ========================================
SELECT 
  u.id,
  u.email,
  u.username,
  u.city,
  u.avatar_icon,
  us.total_xp,
  us.current_level
FROM public.users u
LEFT JOIN public.user_stats us ON u.id = us.user_id
WHERE u.email = 'test@ecoquest.com';

-- ========================================
-- CREDENCIALES DE ACCESO
-- ========================================
/*
Email: test@ecoquest.com
Password: test123
*/

# 🚨 SOLUCIÓN RÁPIDA - Error RLS 42501

## 🔴 Error que estás viendo:

```
POST /rest/v1/users?select=* 403 (Forbidden)
Error: {
  code: '42501',
  message: 'new row violates row-level security policy for table "users"'
}
```

## ✅ Solución en 3 pasos:

### 1️⃣ Ejecuta el script de fix de políticas RLS

```bash
# En Supabase Dashboard:
# 1. Ve a SQL Editor
# 2. Abre arch/FIX-RLS-POLICIES.sql
# 3. Click en RUN (o Ctrl+Enter)
```

**¿Qué hace este script?**

- ❌ Elimina políticas antiguas que bloquean INSERT
- ✅ Crea nuevas políticas con `TO authenticated`
- ✅ Permite que usuarios autenticados creen su perfil

### 2️⃣ Verifica que funcionó

```sql
-- Ejecuta esto en SQL Editor:
SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'users';
```

**Deberías ver:**

```
tablename | policyname                    | cmd    | roles
----------|-------------------------------|--------|---------------
users     | Users can view all profiles   | SELECT | {public}
users     | Users can insert own profile  | INSERT | {authenticated}  ← IMPORTANTE
users     | Users can update own profile  | UPDATE | {authenticated}
```

### 3️⃣ Prueba el login de nuevo

```
Email: test@ecoquest.com
Password: test123
```

**Resultado esperado:**

- ✅ Login exitoso
- ✅ Perfil se carga automáticamente
- ✅ Redirige a /dashboard o /profile-setup

---

## 🤔 ¿Por qué pasó esto?

El problema era que las políticas RLS originales **NO** incluían el modificador `TO authenticated`, por lo que Supabase bloqueaba todas las inserciones de usuarios, incluso las del propio usuario autenticado.

### Política INCORRECTA ❌:

```sql
CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);
  -- Falta: TO authenticated
```

### Política CORRECTA ✅:

```sql
CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  TO authenticated  -- ← Esta línea es crítica
  WITH CHECK (auth.uid() = id);
```

---

## 📋 Checklist completo:

- [ ] Ejecutar `FIX-RLS-POLICIES.sql`
- [ ] Verificar políticas con la query de verificación
- [ ] Ver que "Users can insert own profile" tenga role `authenticated`
- [ ] Hacer login con test@ecoquest.com / test123
- [ ] ✅ Debería funcionar sin error 403

---

## 🎯 Si aún falla:

1. **Verifica que RLS esté habilitado:**

   ```sql
   SELECT tablename, rowsecurity
   FROM pg_tables
   WHERE schemaname = 'public' AND tablename = 'users';
   -- rowsecurity debe ser 't' (true)
   ```

2. **Verifica que el usuario esté autenticado:**

   - Mira en Authentication > Users
   - El usuario debe tener `email_confirmed_at` con fecha
   - Si es NULL, edita el usuario y marca "Auto Confirm User"

3. **Verifica el token en el navegador:**
   - F12 > Application > Local Storage
   - Busca `supabase.auth.token`
   - Debe existir y tener un JWT válido

---

**Última actualización:** 25 de octubre de 2025  
**Proyecto:** EcoQuest - Hackathon CleanUp 2025

# 🎯 Módulo de Desafíos (Challenges)

Este módulo maneja la lógica de los desafíos educativos de reciclaje.

## 📁 Estructura

```
features/challenges/
├── pages/
│   └── ChallengePage.jsx          # Página principal del desafío
├── components/
│   ├── MultipleChoiceChallenge.jsx    # Desafío de opción múltiple
│   ├── DragAndDropChallenge.jsx       # Desafío de arrastrar y soltar
│   └── ResultModal.jsx                # Modal de resultados
└── README.md
```

## 🎮 Tipos de Desafíos

### 1. Multiple Choice (Opción Múltiple)

- El usuario selecciona una respuesta de 4 opciones
- Se valida contra `correct_answer` de la BD
- Formato simple: string con la respuesta correcta

### 2. Drag and Drop (Arrastrar y Soltar)

- El usuario clasifica items en categorías
- Formato de respuesta: `item:categoria,item:categoria,...`
- Ejemplo: `"Botella:plastico,Manzana:organico"`

## 🗄️ Integración con Supabase

### Cargar Desafío

```javascript
const { data } = await supabase
  .from("challenges")
  .select("*")
  .eq("id", challengeId)
  .eq("is_active", true)
  .single();
```

### Guardar Progreso

```javascript
await supabase.from("user_progress").upsert({
  user_id: user.id,
  challenge_id: challenge.id,
  is_completed: true,
  is_correct: correct,
  completed_at: new Date().toISOString(),
});
```

### Actualizar XP (Si es correcto)

```javascript
await supabase.rpc("increment", {
  table_name: "user_stats",
  row_id: user.id,
  column_name: "total_xp",
  x: challenge.xp_reward,
});
```

## 🎨 Características Visuales

### Categorías con Colores

- 🟤 **Orgánico**: Amber/Orange
- 🔵 **Plástico**: Blue/Cyan
- 🟡 **Papel-Cartón**: Yellow/Amber
- 🟢 **Vidrio**: Green/Emerald
- ⚫ **Metal**: Gray/Slate
- 🔴 **No Reciclable**: Red/Rose

### Niveles de Dificultad

- Se muestran como 5 círculos
- Rellenos según `difficulty_level` (1-5)
- Color amarillo para activos, gris para inactivos

## 🚀 Flujo de Usuario

1. **Navegar**: Click en lección desde LearningPage
2. **Cargar**: ChallengePage carga el desafío por ID
3. **Resolver**: Usuario completa el desafío
4. **Enviar**: Click en "Verificar Respuesta"
5. **Resultado**: Modal muestra si es correcto/incorrecto
6. **Recompensa**: Si es correcto, suma XP y actualiza progreso
7. **Continuar**: Volver a /learn o reintentar

## 📊 Sistema de Recompensas

- **XP**: Definido en `xp_reward` de cada challenge
- **Progreso**: Se guarda en `user_progress`
- **Contador**: Incrementa `challenges_completed` en `user_stats`
- **Nivel**: Se actualiza automáticamente por trigger en BD

## ⚠️ Notas Importantes

- Los challenges solo se cargan si `is_active = true`
- El usuario debe estar autenticado
- La ruta está protegida con `ProfileCheckRoute`
- Los modales se cierran automáticamente al continuar
- El progreso se guarda incluso si la respuesta es incorrecta

## 🔧 Próximas Mejoras

- [ ] Agregar temporizador opcional
- [ ] Sistema de pistas (hints)
- [ ] Animaciones más fluidas en drag & drop
- [ ] Modo práctica (sin afectar progreso)
- [ ] Estadísticas por categoría

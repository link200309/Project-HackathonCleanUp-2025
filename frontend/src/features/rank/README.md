# 🏆 Módulo de Ranking

Sistema de clasificación global de usuarios basado en XP, niveles y estadísticas.

## 📁 Estructura

```
rank/
├── hooks/
│   ├── useRanking.js         # Hook para obtener ranking global
│   └── useUserRank.js        # Hook para obtener posición del usuario
├── components/
│   ├── RankCard.jsx          # Tarjeta de usuario en ranking
│   └── UserRankSummary.jsx   # Resumen del usuario actual
├── pages/
│   └── RankingPage.jsx       # Página principal de ranking
└── README.md
```

## 🎯 Características

### ✅ Implementado

- **Ranking en Tiempo Real**: Actualización automática con Supabase Realtime
- **Top 100 Usuarios**: Clasificación por XP total
- **Posición del Usuario**: Cálculo de ranking individual
- **Filtros por Nivel**: Bronce, Plata, Oro, Verde Legendario
- **Diseño Responsivo**: Optimizado para móvil y desktop
- **Animaciones**: Nubes flotantes y transiciones suaves
- **Indicadores Visuales**: Medallas para top 3, destaque del usuario actual

### 📊 Estadísticas Mostradas

- XP Total
- Nivel actual
- Racha de días consecutivos
- Retos completados
- Ciudad del usuario
- Progreso al siguiente nivel

## 🔧 Uso

### Importar en App.jsx

```jsx
import RankingPage from "./features/rank/pages/RankingPage";

// Dentro de las rutas
<Route
  path="/ranking"
  element={
    <ProtectedRoute>
      <RankingPage />
    </ProtectedRoute>
  }
/>;
```

### Hooks Disponibles

#### `useRanking(limit)`

```javascript
import { useRanking } from "./features/rank/hooks/useRanking";

function MyComponent() {
  const { rankings, loading, error, refreshRanking } = useRanking(100);

  // rankings: Array de usuarios ordenados por XP
  // loading: Boolean indicando carga
  // error: Mensaje de error si falla
  // refreshRanking: Función para refrescar datos
}
```

#### `useUserRank()`

```javascript
import { useUserRank } from "./features/rank/hooks/useUserRank";

function MyComponent() {
  const { userRank, loading, error } = useUserRank();

  // userRank: Objeto con datos del usuario actual
  // loading: Boolean indicando carga
  // error: Mensaje de error si falla
}
```

## 🎨 Componentes

### RankCard

Tarjeta individual de usuario en el ranking.

**Props:**

```typescript
{
  user: {
    rank: number;
    username: string;
    avatar_icon: string;
    city: string;
    total_xp: number;
    current_level: string;
    challenges_completed: number;
    current_streak: number;
  },
  isCurrentUser?: boolean;
}
```

### UserRankSummary

Resumen destacado del usuario actual con estadísticas.

**Props:**

```typescript
{
  userRank: {
    rank: number;
    username: string;
    avatar_icon: string;
    total_xp: number;
    current_level: string;
    challenges_completed: number;
    current_streak: number;
    longest_streak: number;
  }
}
```

## 🔄 Realtime

El ranking se actualiza automáticamente cuando:

- Un usuario gana XP
- Un usuario sube de nivel
- Un usuario completa un reto
- Cambia la posición en el ranking

## 🎯 Niveles y Umbrales

| Nivel            | XP Necesario  |
| ---------------- | ------------- |
| Bronce           | 0 - 999       |
| Plata            | 1,000 - 2,999 |
| Oro              | 3,000 - 5,999 |
| Verde Legendario | 6,000+        |

## 🏅 Medallas

- 🥇 **1er Lugar**: Trofeo dorado
- 🥈 **2do Lugar**: Medalla plateada
- 🥉 **3er Lugar**: Medalla bronce
- **Resto**: Número de posición

## 📱 Responsive

- **Mobile**: Grid de 1 columna
- **Tablet**: Grid de 1 columna optimizada
- **Desktop**: Grid de 1 columna con mejor spacing

## 🚀 Optimizaciones

- **Query Eficiente**: Join con user_stats usando `!inner`
- **Índices**: Creados en total_xp para ordenamiento rápido
- **Límite Ajustable**: Cargar más usuarios bajo demanda
- **Caché Local**: Estado manejado por React para evitar re-renders

## 🐛 Troubleshooting

### No se muestra ningún usuario

1. Verificar que RLS esté configurado correctamente
2. Comprobar política: `"Users can view all profiles"`
3. Verificar que existan usuarios en la base de datos

### Realtime no funciona

1. Asegurarse que Realtime esté habilitado en Supabase
2. Verificar que `user_stats` esté en la publicación de Realtime
3. Revisar la consola del navegador para errores

### Usuario actual no se destaca

1. Verificar que `user.id` coincida con el ID de Supabase Auth
2. Comprobar que `useAuth()` esté retornando el usuario correcto

## 📝 Próximas Mejoras (Fase 2)

- [ ] Ranking por ciudad/región
- [ ] Ranking semanal/mensual
- [ ] Comparación con amigos
- [ ] Historial de posiciones
- [ ] Logros por posición alcanzada
- [ ] Notificaciones de cambios de ranking

---

**Autor**: EcoQuest Team  
**Última actualización**: 26 de octubre de 2025

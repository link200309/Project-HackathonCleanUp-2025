import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../../../lib/supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Cargar perfil si hay sesión
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Cargar perfil cuando cambia el estado de autenticación
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Crear perfil de usuario manualmente si el trigger no se ejecutó
   */
  const createUserProfile = useCallback(async (userId) => {
    try {
      // Obtener datos del usuario de auth
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        console.error("No se pudo obtener usuario de auth");
        return;
      }

      const username = authUser.user_metadata?.username || authUser.email?.split('@')[0] || 'usuario';
      
      // Intentar crear el perfil
      const { data, error } = await supabase
        .from("users")
        .insert({
          id: userId,
          email: authUser.email,
          username: username,
        })
        .select()
        .single();

      if (error) {
        // Si ya existe (violación de clave única), intentar obtenerlo de nuevo
        if (error.code === "23505") {
          console.log("Perfil ya existe, reintentando carga...");
          // Reintentar obtener el perfil
          const { data: existingProfile } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();
          
          if (existingProfile) {
            setProfile(existingProfile);
          }
          return;
        }
        console.error("Error al crear perfil:", error);
        return;
      }

      // También crear user_stats
      await supabase
        .from("user_stats")
        .insert({ user_id: userId })
        .select()
        .single();

      setProfile(data);
      console.log("Perfil creado exitosamente");
    } catch (error) {
      console.error("Error al crear perfil manualmente:", error);
    }
  }, []);

  /**
   * Obtener datos del perfil del usuario desde public.users
   */
  const fetchUserProfile = useCallback(async (userId) => {
    try {
      setProfileLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // Si el perfil no existe (código PGRST116), no es un error crítico
        if (error.code === "PGRST116") {
          console.log("Perfil aún no creado, creándolo...");
          // Intentar crear el perfil manualmente
          await createUserProfile(userId);
          return;
        }
        console.error("Error al cargar perfil:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error inesperado al cargar perfil:", error);
    } finally {
      setProfileLoading(false);
    }
  }, [createUserProfile]);

  /**
   * Refrescar datos del perfil del usuario
   */
  const refreshUser = async () => {
    if (user?.id) {
      await fetchUserProfile(user.id);
    }
  };

  /**
   * Verificar si el perfil está completo
   * (tiene ciudad y avatar personalizados)
   */
  const isProfileComplete = () => {
    if (!profile) return false;
    // Consideramos completo si tiene avatar diferente al default
    // Ciudad es opcional, pero si está vacío consideramos incompleto
    return profile.avatar_icon !== "🌱" || profile.city !== null;
  };

  const signUp = async ({ email, password, username }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  const value = {
    user,
    session,
    loading,
    profile,
    profileLoading,
    signUp,
    signIn,
    signOut,
    refreshUser,
    isProfileComplete,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

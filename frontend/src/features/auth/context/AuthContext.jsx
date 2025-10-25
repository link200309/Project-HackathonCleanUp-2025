import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
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

  useEffect(() => {
    console.log("🔐 AuthContext: Inicializando...");

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("🔐 AuthContext: Sesión obtenida:", session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      console.log(
        "🔐 AuthContext: Usuario establecido:",
        session?.user ?? null
      );
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("🔐 AuthContext: Cambio de estado:", _event, session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      console.log(
        "🔐 AuthContext: Usuario actualizado:",
        session?.user ?? null
      );
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async ({ email, password, username }) => {
    try {
      console.log("📝 AuthContext: Registrando usuario...", {
        email,
        username,
      });
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

      console.log("✅ AuthContext: Registro exitoso:", data);
      return { data, error: null };
    } catch (error) {
      console.error("❌ AuthContext: Error en registro:", error);
      return { data: null, error: error.message };
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      console.log("🔑 AuthContext: Iniciando sesión...", { email });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("✅ AuthContext: Login exitoso:", data);
      console.log("✅ AuthContext: Usuario:", data.user);
      console.log("✅ AuthContext: Sesión:", data.session);
      return { data, error: null };
    } catch (error) {
      console.error("❌ AuthContext: Error en login:", error);
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
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

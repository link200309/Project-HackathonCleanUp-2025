import { useState, useEffect } from "react"; // COMENTADO: React no es necesario
import { Recycle, ChevronRight, LogOut } from "lucide-react"; // COMENTADO: User
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const goLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  // Función para determinar si un NavLink debe estar activo
  const isNavLinkActive = (path) => {
    // Para "Jugar" (/game), también activar si estamos en /challenge/:id
    if (path === "/game" && location.pathname.startsWith("/challenge")) {
      return true;
    }
    // Para "Aprender" (/learn), también activar si estamos en /learn
    if (path === "/learn" && location.pathname.startsWith("/learn")) {
      return true;
    }
    // Para otras rutas, verificar coincidencia exacta
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Jugar", path: "/game" },
    { name: "Aprender", path: "/learn" },
    { name: "Recicladores", path: "/recicladores" },
    { name: "Ranking", path: "/ranking" },
  ];

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "backdrop-blur-xl" : "backdrop-blur-md"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-emerald-600 p-2.5 rounded-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Recycle className="w-7 h-7 text-white" />
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              CleanUp Hero
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = isNavLinkActive(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="group relative px-10 py-2 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-base font-bold transition-colors ${
                        isActive
                          ? "text-yellow-400"
                          : "text-neutral-100 group-hover:text-yellow-300"
                      }`}
                    >
                      {item.name}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-yellow-400 rounded-full"></span>
                    )}
                  </div>
                </NavLink>
              );
            })}
          </div>

          {/* Botón de inicio de sesión o cerrar sesión */}
          {!user ? (
            <button
              className="relative group overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              onClick={goLogin}
            >
              <span className="relative z-10">Iniciar sesión</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ) : (
            <button
              className="relative group overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              onClick={handleLogout}
            >
              <span className="relative z-10">Cerrar sesión</span>
              <LogOut className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

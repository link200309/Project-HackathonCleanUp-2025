import { useAuth } from "../features/auth/context/AuthContext";
import { Button } from "../shared/components";

const DashboardPage = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                ¡Bienvenido, {user?.user_metadata?.username || "Eco Guerrero"}!
                🌱
              </h1>
              <p className="text-gray-600">Email: {user?.email}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Dashboard en Desarrollo
          </h2>
          <p className="text-gray-600 mb-4">
            Esta es tu página principal. Aquí verás tus estadísticas, retos y
            progreso.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-gray-600">XP Total</div>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">🔥</div>
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-gray-600">Días de Racha</div>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-3xl font-bold text-yellow-600">0</div>
              <div className="text-gray-600">Retos Completados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

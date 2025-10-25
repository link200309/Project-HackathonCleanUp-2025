import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Button, Input, Card } from "../../../shared/components";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setErrorMessage("");

    const { error } = await signIn({
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage("Credenciales incorrectas. Intenta de nuevo.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          ¡Bienvenido de vuelta!
        </h1>
        <p className="text-gray-600">Continúa tu aventura ecológica</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="tu@email.com"
          icon={Mail}
          error={errors.email?.message}
          {...register("email", {
            required: "El email es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
        />

        {/* Password */}
        <Input
          label="Contraseña"
          type="password"
          placeholder="Tu contraseña"
          icon={Lock}
          error={errors.password?.message}
          {...register("password", {
            required: "La contraseña es requerida",
          })}
        />

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-600 hover:text-green-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
            <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">O</span>
        </div>
      </div>

      {/* Guest Mode Button (opcional) */}
      <Button
        type="button"
        variant="outline"
        size="md"
        fullWidth
        onClick={() => navigate("/guest")}
      >
        🎮 Probar como invitado
      </Button>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-green-600 font-bold hover:text-green-700 hover:underline"
          >
            Regístrate gratis
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default LoginForm;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { Button, Input, Card } from "../../../shared/components";
import { useAuth } from "../context/AuthContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await signUp({
      email: formData.email,
      password: formData.password,
      username: formData.username,
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setSuccessMessage("¡Cuenta creada! Redirigiendo...");
    setTimeout(() => {
      navigate("/profile-setup");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          ¡Únete a EcoQuest!
        </h1>
        <p className="text-gray-600">
          Aprende sobre reciclaje mientras te diviertes
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Username */}
        <Input
          label="Nombre de usuario"
          type="text"
          placeholder="Ej: eco_warrior"
          icon={User}
          error={errors.username?.message}
          {...register("username", {
            required: "El nombre de usuario es requerido",
            minLength: {
              value: 3,
              message: "Mínimo 3 caracteres",
            },
            maxLength: {
              value: 20,
              message: "Máximo 20 caracteres",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "Solo letras, números y guión bajo",
            },
          })}
        />

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
          placeholder="Mínimo 6 caracteres"
          icon={Lock}
          error={errors.password?.message}
          {...register("password", {
            required: "La contraseña es requerida",
            minLength: {
              value: 6,
              message: "Mínimo 6 caracteres",
            },
          })}
        />

        {/* Confirm Password */}
        <Input
          label="Confirmar contraseña"
          type="password"
          placeholder="Repite tu contraseña"
          icon={Lock}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Confirma tu contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
        />

        {/* Error Message */}
        {errorMessage && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
            <p className="text-green-700 text-sm font-medium flex items-center gap-2">
              <span>✅</span> {successMessage}
            </p>
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
          {isLoading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-green-600 font-bold hover:text-green-700 hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default RegisterForm;

import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useProfileSetup } from "../hooks/useProfileSetup";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import Card from "../../../shared/components/Card";

// Opciones de avatares con emojis de naturaleza
const AVATAR_OPTIONS = [
  { emoji: "🌱", label: "Brote" },
  { emoji: "🌿", label: "Hoja" },
  { emoji: "🌳", label: "Árbol" },
  { emoji: "🌻", label: "Girasol" },
  { emoji: "🍃", label: "Hojas" },
  { emoji: "🌾", label: "Trigo" },
  { emoji: "🌲", label: "Pino" },
  { emoji: "🌴", label: "Palmera" },
  { emoji: "🌵", label: "Cactus" },
  { emoji: "🌺", label: "Flor" },
  { emoji: "🍀", label: "Trébol" },
  { emoji: "🌼", label: "Margarita" },
];

/**
 * Componente de configuración inicial de perfil
 * Se muestra después del registro para completar ciudad y avatar
 */
export default function ProfileSetupForm({ onSkip }) {
  const navigate = useNavigate();
  const { updateProfile, loading, error } = useProfileSetup();
  const [selectedAvatar, setSelectedAvatar] = useState("🌱");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await updateProfile({
      city: data.city.trim() || null,
      avatarIcon: selectedAvatar,
    });

    if (result.success) {
      navigate("/dashboard");
    }
  };

  const handleSkipNow = () => {
    if (onSkip) {
      onSkip();
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          ¡Bienvenido a EcoQuest! 🎉
        </h2>
        <p className="text-gray-600">
          Personaliza tu perfil para empezar tu aventura ecológica
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Selector de Avatar */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Elige tu avatar
          </label>
          <div className="grid grid-cols-6 gap-2">
            {AVATAR_OPTIONS.map((avatar) => (
              <button
                key={avatar.emoji}
                type="button"
                onClick={() => setSelectedAvatar(avatar.emoji)}
                className={`
                  w-12 h-12 text-3xl rounded-2xl transition-all duration-200
                  flex items-center justify-center
                  ${
                    selectedAvatar === avatar.emoji
                      ? "bg-green-100 ring-4 ring-green-500 scale-110"
                      : "bg-gray-100 hover:bg-gray-200 hover:scale-105"
                  }
                `}
                title={avatar.label}
                aria-label={`Seleccionar avatar ${avatar.label}`}
              >
                {avatar.emoji}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Avatar seleccionado: {selectedAvatar}
          </p>
        </div>

        {/* Campo de Ciudad (opcional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ¿De dónde eres? (opcional)
          </label>
          <Input
            {...register("city", {
              maxLength: {
                value: 50,
                message: "Máximo 50 caracteres",
              },
            })}
            placeholder="Ej: La Paz, Cochabamba, Santa Cruz..."
            error={errors.city?.message}
          />
          <p className="text-xs text-gray-500 mt-1">
            Ayúdanos a conocer mejor a nuestra comunidad
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}

        {/* Botones */}
        <div className="space-y-3">
          <Button type="submit" variant="primary" fullWidth loading={loading}>
            Continuar
          </Button>

          <Button
            type="button"
            variant="ghost"
            fullWidth
            onClick={handleSkipNow}
            disabled={loading}
          >
            Omitir por ahora
          </Button>
        </div>
      </form>

      {/* Información adicional */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Puedes cambiar tu avatar y ciudad en cualquier momento desde tu perfil
        </p>
      </div>
    </Card>
  );
}

ProfileSetupForm.propTypes = {
  onSkip: PropTypes.func,
};

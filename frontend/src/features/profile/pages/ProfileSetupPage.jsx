import ProfileSetupForm from "../components/ProfileSetupForm";
import AuthLayout from "../../../shared/layout/AuthLayout";

/**
 * Página de configuración inicial de perfil
 * Se muestra después del primer registro/login
 */
export default function ProfileSetupPage() {
  return (
    <AuthLayout>
      <ProfileSetupForm />
    </AuthLayout>
  );
}

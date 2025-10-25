import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../features/auth/context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ProfileCheckRoute = ({ children }) => {
  const { user, profile, profileLoading, loading } = useAuth();

  if (loading || profileLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!profile) {
    return <LoadingSpinner message="Cargando perfil..." />;
  }

  const isProfileComplete =
    profile.avatar_icon !== "🌱" || profile.city !== null;

  if (!isProfileComplete) {
    return <Navigate to="/profile-setup" />;
  }

  return children;
};

ProfileCheckRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfileCheckRoute;

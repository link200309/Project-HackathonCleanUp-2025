import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../features/auth/context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ProfileCheckRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  
  return children;
};

ProfileCheckRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfileCheckRoute;

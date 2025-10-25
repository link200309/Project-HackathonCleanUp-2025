import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../features/auth/context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return !user ? children : <Navigate to="/dashboard" />;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;

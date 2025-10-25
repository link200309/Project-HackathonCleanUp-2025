import PropTypes from "prop-types";
import { Recolector, Nina, Can } from "../components/Animations";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-yellow-200 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute bottom-40 right-1/3 w-44 h-44 bg-green-300 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>

      <Can className="absolute bottom-0 right-[70%]" />

      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-gray-600 text-sm">
          © 2025 EcoQuest • Aprende, Juega, Cuida el Planeta 🌍
        </p>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;

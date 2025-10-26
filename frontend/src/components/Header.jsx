// Header.jsx (versión extendida para reutilizar en pantallas como Ranking)
import PropTypes from "prop-types";
import { ChevronLeft } from "lucide-react";

const Header = ({
  unit = true,
  unitNumber = 1,
  title = "Introducción al Reciclaje",
  description = "Aprende los fundamentos del reciclaje",
  color = "green",
  onBack,
  children,
  showContent = true,
}) => {
  const colorClasses = {
    green: "from-emerald-800 to-green-700 border-yellow-400",
    blue: "from-blue-800 to-blue-600 border-yellow-400",
    yellow: "from-yellow-600 to-amber-500 border-yellow-300",
    purple: "from-purple-800 to-indigo-700 border-yellow-400",
    red: "from-red-700 to-orange-600 border-yellow-400",
  };

  return (
    <div
      className={`sticky  bg-gradient-to-r ${
        colorClasses[color] || colorClasses.green
      } border-b-4 shadow-xl w-full mb-10`}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 relative">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {showContent ? (
          <div className="flex flex-col">
            {unit && (
              <div className="bg-white/20 px-4 py-1 rounded-full mb-2">
                <span className="text-white text-sm font-bold">
                  UNIDAD {unitNumber}
                </span>
              </div>
            )}
            <h1 className="text-4xl font-black text-white drop-shadow-lg mb-2">
              {title}
            </h1>
            <p className="text-yellow-200 font-medium drop-shadow">
              {description}
            </p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  unit: PropTypes.bool,
  unitNumber: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.oneOf(["green", "blue", "yellow", "purple", "red"]),
  onBack: PropTypes.func,
  children: PropTypes.node,
  showContent: PropTypes.bool,
};

export default Header;

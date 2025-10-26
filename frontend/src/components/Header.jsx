import PropTypes from "prop-types";
import { ChevronLeft } from "lucide-react";

const Header = ({
  unit = true,
  unitNumber = 1,
  title = "Introducción al Reciclaje",
  description = "Aprende los fundamentos del reciclaje",
  color = "yellow",
  onBack,
}) => {
  const colorClasses = {
    green: "from-green-400 to-green-600 border-green-700",
    blue: "from-blue-400 to-blue-600 border-blue-700",
    yellow: "from-yellow-400 to-yellow-600 border-yellow-700",
    purple: "from-purple-400 to-purple-600 border-purple-700",
    red: "from-red-400 to-red-600 border-red-700",
  };

  return (
    <div
      className={`
      relative bg-gradient-to-r ${colorClasses[color] || colorClasses.green}
      border-b-8 rounded-3xl p-6 mb-16 shadow-xl
    `}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      <div className="text-center">
        {unit && (
          <div className="inline-block bg-white/20 px-4 py-1 rounded-full mb-2">
            <span className="text-white text-sm font-bold">
              UNIDAD {unitNumber}
            </span>
          </div>
        )}
        <h1 className="text-3xl font-black text-white mb-2">{title}</h1>
        <p className="text-white/90 text-lg">{description}</p>
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
};

export default Header;

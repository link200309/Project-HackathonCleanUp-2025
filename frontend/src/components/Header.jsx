import PropTypes from "prop-types";
import { ChevronLeft } from "lucide-react";
import * as Icons from "lucide-react";

const Header = ({
  unit = false,
  unitNumber = 1,
  title = "Introducción al Reciclaje",
  description = "Aprende los fundamentos del reciclaje",
  color = "green",
  icon,
  rightContent,
  onBack,
}) => {
  const colorClasses = {
    green: "from-emerald-800 to-green-700 border-yellow-400",
    blue: "from-blue-800 to-sky-700 border-blue-300",
    yellow: "from-yellow-500 to-amber-600 border-yellow-700",
    purple: "from-purple-700 to-violet-600 border-violet-800",
    red: "from-red-700 to-rose-600 border-red-800",
  };

  const IconComponent = icon ? Icons[icon] : null;

  return (
    <div
      className={`z-10 bg-gradient-to-r ${
        colorClasses[color] || colorClasses.green
      } border-b-4 shadow-xl`}
    >
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {IconComponent && (
            <IconComponent className="w-10 h-10 text-yellow-400 drop-shadow-lg" />
          )}
          <div>
            {unit && (
              <span className="block text-sm font-bold text-yellow-300 mb-1">
                UNIDAD {unitNumber}
              </span>
            )}
            <h1 className="text-3xl font-black text-white drop-shadow-lg">
              {title}
            </h1>
            <p className="text-yellow-200 font-medium">{description}</p>
          </div>
        </div>

        {rightContent && <div>{rightContent}</div>}

        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
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
  icon: PropTypes.string,
  rightContent: PropTypes.node,
  onBack: PropTypes.func,
};

export default Header;

import PropTypes from "prop-types";
import { Lock, Star, Book, Trophy } from "lucide-react";

const LessonNode = ({
  type = "lesson",
  isCompleted = false,
  isActive = true,
  isLocked = false,
  title = "Lección",
  stars = 0,
  onClick,
}) => {
  const getNodeStyle = () => {
    if (isLocked) {
      return "bg-gray-600 border-gray-700 cursor-not-allowed opacity-50";
    }
    if (isCompleted) {
      return "bg-gradient-to-br from-yellow-400 to-orange-400 border-yellow-600 hover:from-yellow-500 hover:to-orange-500 cursor-pointer shadow-xl shadow-yellow-500/50";
    }
    if (isActive) {
      return "bg-gradient-to-br from-green-500 to-emerald-600 border-green-700 hover:from-green-600 hover:to-emerald-700 cursor-pointer shadow-2xl shadow-green-500/60 animate-pulse";
    }
    return "bg-gray-500 border-gray-600 cursor-not-allowed opacity-60";
  };

  const getIcon = () => {
    if (isLocked) return <Lock className="w-8 h-8 text-white" />;
    if (type === "test") return <Trophy className="w-8 h-8 text-white" />;
    if (type === "story") return <Book className="w-8 h-8 text-white" />;
    if (isCompleted) return <Star className="w-8 h-8 text-white fill-white" />;
    return <Star className="w-8 h-8 text-white" />;
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={!isLocked && isActive ? onClick : undefined}
        disabled={isLocked || !isActive}
        className={`
          relative w-20 h-20 rounded-full border-b-8 
          flex items-center justify-center
          transition-all duration-200 transform hover:scale-105
          ${getNodeStyle()}
        `}
      >
        {getIcon()}

        {isCompleted && stars > 0 && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full w-8 h-8 flex items-center justify-center border-3 border-white shadow-lg">
            <span className="text-xs font-bold text-white">{stars}/3</span>
          </div>
        )}
      </button>

      {!isLocked && (
        <span className="mt-2 text-sm font-bold text-white drop-shadow-lg text-center max-w-[100px]">
          {title}
        </span>
      )}
    </div>
  );
};

LessonNode.propTypes = {
  type: PropTypes.oneOf(["lesson", "test", "story"]),
  isCompleted: PropTypes.bool,
  isActive: PropTypes.bool,
  isLocked: PropTypes.bool,
  title: PropTypes.string,
  stars: PropTypes.number,
  onClick: PropTypes.func,
};

export default LessonNode;

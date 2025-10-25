import PropTypes from "prop-types";
import LessonNode from "./LessonNode";

const LearningPath = ({ lessons = [], onLessonClick }) => {
  const pathPositions = [
    "translate-x-0",
    "translate-x-12",
    "-translate-x-12",
    "translate-x-0",
    "translate-x-16",
    "-translate-x-16",
    "translate-x-8",
    "-translate-x-8",
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto py-8">
      <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-yellow-400/30 via-green-500/40 to-yellow-400/30 -translate-x-1/2 rounded-full shadow-lg" />

      <div className="relative space-y-16">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id || index}
            className={`flex justify-center ${
              pathPositions[index % pathPositions.length]
            } transition-all duration-500`}
          >
            <LessonNode
              type={lesson.type}
              isCompleted={lesson.isCompleted}
              isActive={lesson.isActive}
              isLocked={lesson.isLocked}
              title={lesson.title}
              stars={lesson.stars}
              onClick={() => onLessonClick && onLessonClick(lesson)}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

LearningPath.propTypes = {
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.string,
      title: PropTypes.string,
      isCompleted: PropTypes.bool,
      isActive: PropTypes.bool,
      isLocked: PropTypes.bool,
      stars: PropTypes.number,
    })
  ),
  onLessonClick: PropTypes.func,
};

export default LearningPath;

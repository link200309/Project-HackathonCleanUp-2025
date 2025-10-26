import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const TrashBin = ({ colorName = "Green", width = "40", hovered = false }) => {
  const [hovered, setHovered] = useState(false);
  const closedSrc = `/assets/images/bins/Trash${colorName}.webp`;
  const openSrc = `/assets/images/bins/Trash${colorName}Open.webp`;

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative w-${width} h-50`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={hovered ? "open" : "closed"}
            src={hovered ? openSrc : closedSrc}
            alt={`Basurero ${colorName}`}
            className=" w-full h-full object-contain"
            initial={{ opacity: 1, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 1, scale: 0.9, y: -5 }}
            transition={{
              duration: 0.15,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

TrashBin.propTypes = {
  colorName: PropTypes.string,
  hovered: PropTypes.bool,
};

export default TrashBin;

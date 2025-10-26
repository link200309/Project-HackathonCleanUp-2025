import { useState } from "react";
import { motion } from "framer-motion";

const TrashBin = ({ colorName, label }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-32 h-40 flex items-end justify-center">
        <motion.img
          key={hovered ? "open" : "closed"}
          src={`/assets/images/bins/Trash${colorName}${hovered ? "Open" : ""}.webp`}
          alt={`Basurero ${colorName}`}
          className="absolute bottom-0 w-full object-contain"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <span className="mt-2 text-white font-semibold drop-shadow-md">
        {label}
      </span>
    </div>
  );
};

export default TrashBin;

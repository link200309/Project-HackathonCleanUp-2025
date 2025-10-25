import { useState } from "react";
import PropTypes from "prop-types";
import { GripVertical } from "lucide-react";

/**
 * Componente para desafíos de arrastrar y soltar
 * Los items se deben clasificar en categorías
 */
const DragAndDropChallenge = ({ challenge, onSubmit }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Obtener las categorías únicas de las opciones
  const categories = [...new Set(challenge.options.map((opt) => opt.category))];

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (category) => {
    if (draggedItem && !hasSubmitted) {
      setDroppedItems({
        ...droppedItems,
        [draggedItem.name]: category,
      });
      setDraggedItem(null);
    }
  };

  const handleSubmit = () => {
    if (
      !hasSubmitted &&
      Object.keys(droppedItems).length === challenge.options.length
    ) {
      // Crear string de respuesta con formato "item:categoria,item:categoria"
      const answer = challenge.options
        .map((opt) => `${opt.name}:${droppedItems[opt.name] || "none"}`)
        .join(",");

      setHasSubmitted(true);
      onSubmit(answer);
    }
  };

  const getItemsInCategory = (category) => {
    return challenge.options.filter(
      (opt) => droppedItems[opt.name] === category
    );
  };

  const getUnplacedItems = () => {
    return challenge.options.filter((opt) => !droppedItems[opt.name]);
  };

  const getCategoryColor = (category) => {
    const colors = {
      organico: "bg-amber-100 border-amber-400",
      plastico: "bg-blue-100 border-blue-400",
      "papel-carton": "bg-yellow-100 border-yellow-400",
      vidrio: "bg-green-100 border-green-400",
      metal: "bg-gray-100 border-gray-400",
      "no-reciclable": "bg-red-100 border-red-400",
    };
    return colors[category] || "bg-gray-100 border-gray-400";
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
      {/* Pregunta */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-800 mb-2">
          {challenge.question}
        </h2>
        <p className="text-gray-500 text-sm">
          Arrastra cada elemento a la categoría correcta
        </p>
      </div>

      {/* Items sin clasificar */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-700 mb-3">
          Elementos por clasificar:
        </h3>
        <div className="flex flex-wrap gap-3">
          {getUnplacedItems().map((item, index) => (
            <div
              key={index}
              draggable={!hasSubmitted}
              onDragStart={() => handleDragStart(item)}
              className={`flex items-center gap-2 bg-white border-2 border-gray-300 px-4 py-3 rounded-xl shadow-md ${
                !hasSubmitted
                  ? "cursor-move hover:border-green-400 hover:shadow-lg"
                  : "cursor-not-allowed opacity-75"
              } transition-all`}
            >
              <GripVertical className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-gray-800">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categorías (Zonas de drop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {categories.map((category) => (
          <div
            key={category}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(category)}
            className={`${getCategoryColor(
              category
            )} border-4 border-dashed rounded-2xl p-4 min-h-[150px] transition-all ${
              draggedItem ? "scale-105 shadow-lg" : ""
            }`}
          >
            <h4 className="font-bold text-gray-800 mb-3 capitalize">
              {category.replace("-", " ")}
            </h4>
            <div className="space-y-2">
              {getItemsInCategory(category).map((item, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-300 px-3 py-2 rounded-lg shadow-sm"
                >
                  <span className="font-medium text-gray-700">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botón de enviar */}
      <button
        onClick={handleSubmit}
        disabled={
          Object.keys(droppedItems).length !== challenge.options.length ||
          hasSubmitted
        }
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 ${
          Object.keys(droppedItems).length !== challenge.options.length ||
          hasSubmitted
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:scale-105"
        }`}
      >
        {hasSubmitted
          ? "Respuesta enviada"
          : `Verificar (${Object.keys(droppedItems).length}/${
              challenge.options.length
            })`}
      </button>
    </div>
  );
};

DragAndDropChallenge.propTypes = {
  challenge: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DragAndDropChallenge;

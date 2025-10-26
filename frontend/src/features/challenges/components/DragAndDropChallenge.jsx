import { useState } from "react";
import PropTypes from "prop-types";
import { GripVertical } from "lucide-react";
import TrashBin from "../../../components/TrashBin";
/**
 * Componente para desafíos de arrastrar y soltar
 * Los items se deben clasificar en categorías con componente TrashBin
 */
const DragAndDropChallenge = ({ challenge, onSubmit }) => {
  const [normalHover, setNormalHover] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

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
      setHoveredCategory(null);
    }
  };

  // Función para remover un item de una categoría (doble click o botón)
  const handleRemoveItem = (itemName) => {
    if (!hasSubmitted) {
      const newDroppedItems = { ...droppedItems };
      delete newDroppedItems[itemName];
      setDroppedItems(newDroppedItems);
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

  // Obtener nombre del color del basurero según categoría
  const getTrashColorName = (category) => {
    const colorNames = {
      organico: "Green", // Verde para orgánico
      plastico: "Yellow", // Amarillo para plástico
      "papel-carton": "Blue", // Azul para papel y cartón
      vidrio: "Green", // Verde para vidrio
      metal: "Yellow", // Amarillo para metal
      "no-reciclable": "Black", // Negro para no reciclable
    };

    return colorNames[category] || "Grey"; // Default si no coincide
  };

  // Obtener nombre legible de la categoría
  const getCategoryName = (category) => {
    const names = {
      organico: "Orgánico",
      plastico: "Plástico",
      "papel-carton": "Papel y Cartón",
      vidrio: "Vidrio",
      metal: "Metal",
      "no-reciclable": "No Reciclable",
    };
    return names[category] || category;
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
        <h3 className="font-bold text-gray-700 mb-4 text-lg flex items-center gap-2">
          <span className="text-2xl">🗑️</span>
          Arrastra estos residuos al basurero correcto:
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {getUnplacedItems().map((item, index) => (
            <div
              key={index}
              draggable={!hasSubmitted}
              onDragStart={() => handleDragStart(item)}
              className={`flex items-center gap-2 bg-gradient-to-br from-white to-gray-50 border-3 border-gray-300 px-5 py-3 rounded-2xl shadow-lg ${
                !hasSubmitted
                  ? "cursor-move hover:border-green-400 hover:shadow-2xl hover:scale-110 active:scale-95"
                  : "cursor-not-allowed opacity-75"
              } transition-all duration-200`}
            >
              <GripVertical className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-gray-800 text-base">
                {item.name}
              </span>
            </div>
          ))}
        </div>
        {getUnplacedItems().length === 0 && !hasSubmitted && (
          <div className="text-center py-4">
            <p className="text-green-600 font-bold text-lg">
              ¡Todos los residuos clasificados! 🎉
            </p>
            <p className="text-gray-500 text-sm">
              Haz clic en &quot;Verificar&quot; para comprobar tus respuestas
            </p>
          </div>
        )}
      </div>

      {/* Categorías (Zonas de drop con imágenes de basureros) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <div
            key={category}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(category)}
            className={`relative ${getCategoryColor(
              category
            )} border-4 rounded-3xl p-4 min-h-[280px] transition-all ${
              draggedItem
                ? "scale-105 shadow-2xl ring-4 ring-green-400"
                : "shadow-lg"
            } hover:shadow-xl cursor-pointer`}
            onDragEnter={() => draggedItem && setHoveredCategory(category)}
            onDragLeave={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX;
              const y = e.clientY;

              if (
                x < rect.left ||
                x >= rect.right ||
                y < rect.top ||
                y >= rect.bottom
              ) {
                setHoveredCategory(null);
              }
            }}
            onMouseEnter={() => setNormalHover(category)}
            onMouseLeave={() => setNormalHover(null)}
          >
            {/* Componente del basurero */}
            <div className="flex flex-col items-center mb-3">
              <div className="flex-shrink-0 h-full flex items-end">
                <TrashBin
                  colorName={getTrashColorName(category)}
                  label={getCategoryName(category)}
                  width="36"
                  hovered={
                    hoveredCategory === category || normalHover === category
                  }
                />
              </div>
              <h4 className="font-black text-gray-800 text-center text-lg mt-2">
                {getCategoryName(category)}
              </h4>
            </div>

            {/* Items dentro del basurero */}
            <div className="space-y-2 max-h-[120px]">
              {getItemsInCategory(category).map((item, index) => (
                <div
                  key={index}
                  draggable={!hasSubmitted}
                  onDragStart={() => handleDragStart(item)}
                  onClick={() => handleRemoveItem(item.name)}
                  className={`bg-white/90 backdrop-blur-sm border-2 border-gray-300 px-3 py-2 rounded-xl shadow-sm transition-all flex items-center justify-between group ${
                    !hasSubmitted
                      ? "cursor-move hover:border-green-400 hover:shadow-md hover:scale-105"
                      : "cursor-not-allowed opacity-75"
                  }`}
                  title={
                    !hasSubmitted
                      ? "Arrastra para mover o haz clic para devolver"
                      : ""
                  }
                >
                  <span className="font-medium text-gray-700 text-sm">
                    {item.name}
                  </span>
                  {!hasSubmitted && (
                    <GripVertical className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              ))}
            </div>

            {/* Indicador de arrastre */}
            {draggedItem && (
              <div className="absolute inset-0 border-4 border-dashed border-green-500 rounded-3xl pointer-events-none animate-pulse"></div>
            )}
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

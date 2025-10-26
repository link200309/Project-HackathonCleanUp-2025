import { useState } from "react";
import PropTypes from "prop-types";
import { CheckCircle2 } from "lucide-react";

/**
 * Componente para desafíos de opción múltiple
 */
const MultipleChoiceChallenge = ({ challenge, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption !== null && !hasSubmitted) {
      setHasSubmitted(true);
      onSubmit(selectedOption);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto">
      {/* Imagen del desafío (si existe) */}
      {challenge.image_url && (
        <div className="mb-6 rounded-2xl overflow-hidden">
          <img
            src={challenge.image_url}
            alt="Desafío"
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Pregunta */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-800 mb-2">
          {challenge.question}
        </h2>
        <p className="text-gray-500 text-sm">
          Selecciona la respuesta correcta
        </p>
      </div>

      {/* Opciones */}
      <div className="space-y-3 mb-8">
        {challenge.options.map((option, index) => {
          const isSelected = selectedOption === option;
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D

          return (
            <button
              key={index}
              onClick={() => !hasSubmitted && setSelectedOption(option)}
              disabled={hasSubmitted}
              className={`w-full text-left p-4 rounded-2xl border-4 transition-all duration-200 ${
                isSelected
                  ? "border-green-500 bg-green-50 scale-105 shadow-lg"
                  : "border-gray-200 bg-white hover:border-green-300 hover:shadow-md"
              } ${
                hasSubmitted
                  ? "cursor-not-allowed opacity-75"
                  : "cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    isSelected
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {optionLetter}
                </div>
                <span className="font-semibold text-gray-800 flex-1">
                  {option}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Botón de enviar */}
      <button
        onClick={handleSubmit}
        disabled={selectedOption === null || hasSubmitted}
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 ${
          selectedOption === null || hasSubmitted
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:scale-105"
        }`}
      >
        {hasSubmitted ? "Respuesta enviada" : "Verificar Respuesta"}
      </button>
    </div>
  );
};

MultipleChoiceChallenge.propTypes = {
  challenge: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    image_url: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MultipleChoiceChallenge;

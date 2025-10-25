import PropTypes from "prop-types";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";

/**
 * Modal que muestra el resultado del desafío
 */
const ResultModal = ({
  isCorrect,
  userAnswer,
  correctAnswer,
  explanation,
  xpEarned,
  onContinue,
  onTryAgain,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-bounce-in">
        {/* Icono y título */}
        <div className="text-center mb-6">
          {isCorrect ? (
            <>
              <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-4xl font-black text-green-600 mb-2">
                ¡Correcto!
              </h2>
              <p className="text-gray-600">¡Excelente trabajo!</p>
            </>
          ) : (
            <>
              <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
              <h2 className="text-4xl font-black text-red-600 mb-2">
                Incorrecto
              </h2>
              <p className="text-gray-600">¡Sigue intentando!</p>
            </>
          )}
        </div>

        {/* XP ganado */}
        {isCorrect && xpEarned > 0 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mb-6 flex items-center justify-center gap-3">
            <Award className="w-8 h-8 text-white" />
            <span className="text-2xl font-black text-white">
              +{xpEarned} XP
            </span>
          </div>
        )}

        {/* Respuestas */}
        {!isCorrect && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">
                Tu respuesta:
              </p>
              <p className="text-lg font-bold text-red-600">{userAnswer}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">
                Respuesta correcta:
              </p>
              <p className="text-lg font-bold text-green-600">
                {correctAnswer}
              </p>
            </div>
          </div>
        )}

        {/* Explicación */}
        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span>
            ¿Sabías que...?
          </h3>
          <p className="text-gray-700 leading-relaxed">{explanation}</p>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          {!isCorrect && onTryAgain && (
            <button
              onClick={onTryAgain}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reintentar
            </button>
          )}
          <button
            onClick={onContinue}
            className={`${
              !isCorrect && onTryAgain ? "flex-1" : "w-full"
            } bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

ResultModal.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  userAnswer: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
  xpEarned: PropTypes.number,
  onContinue: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func,
};

export default ResultModal;

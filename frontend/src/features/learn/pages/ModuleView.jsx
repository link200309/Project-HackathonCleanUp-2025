import PropTypes from "prop-types";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";

function ModuleView({ setCurrentView, selectedModule }) {
  const parseContent = (content) => {
    const sections = [];
    const lines = content.split("\n");
    let currentSection = { type: "text", content: [] };

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("**") && trimmed.endsWith(":**")) {
        if (currentSection.content.length > 0) {
          sections.push(currentSection);
        }
        currentSection = {
          type: "section",
          title: trimmed.replace(/\*\*/g, "").replace(":", ""),
          content: [],
        };
      } else if (trimmed.startsWith("- **") || trimmed.startsWith("•")) {
        const cleanLine = trimmed.replace(/^[-•]\s*/, "");
        currentSection.content.push({ type: "listItem", text: cleanLine });
      } else if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
        currentSection.content.push({
          type: "listItem",
          text: trimmed.substring(2),
        });
      } else if (trimmed.length > 0) {
        currentSection.content.push({ type: "text", text: trimmed });
      }
    });

    if (currentSection.content.length > 0) {
      sections.push(currentSection);
    }

    return sections;
  };

  const sections = parseContent(selectedModule.content);

  return (
    <div className="min-h-screen pb-8 pt-0">
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => setCurrentView("home")}
          className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg mb-6 font-semibold transition-all border border-white/20"
        >
          <ArrowLeft className="w-5 h-5" /> Volver al inicio
        </button>

        <div className="rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-lg border-2 border-white/50">
          {/* Header con gradiente */}
          <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 text-[200px]">
              {selectedModule.icon}
            </div>
            <div className="flex relative z-10 ">
              <span className="text-8xl md:text-6xl mr-4 block drop-shadow-2xl">
                {selectedModule.icon}
              </span>
              <div className="flex items-center justify-center gap-3 mb-4">
                <h1 className="text-4xl md:text-4xl font-bold drop-shadow-lg">
                  {selectedModule.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Contenido mejorado */}
          <div className="p-6 md:p-10 space-y-6">
            {sections.map((section, idx) => (
              <div key={idx}>
                {section.type === "section" && section.title && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200/50 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-green-600">✦</span>
                      {section.title}
                    </h2>
                    <div className="space-y-3">
                      {section.content.map((item, itemIdx) => (
                        <div key={itemIdx}>
                          {item.type === "listItem" ? (
                            <div className="flex items-start gap-3 bg-white/60 rounded-lg p-4 hover:bg-white/80 transition-colors">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <p className="text-gray-700 leading-relaxed">
                                {item.text.split("**").map((part, i) =>
                                  i % 2 === 1 ? (
                                    <strong key={i} className="text-gray-900">
                                      {part}
                                    </strong>
                                  ) : (
                                    part
                                  )
                                )}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {item.text.split("**").map((part, i) =>
                                i % 2 === 1 ? (
                                  <strong key={i} className="text-gray-900">
                                    {part}
                                  </strong>
                                ) : (
                                  part
                                )
                              )}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.type === "text" && section.content.length > 0 && (
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200/50">
                    {section.content.map((item, itemIdx) => (
                      <div key={itemIdx}>
                        {item.type === "listItem" ? (
                          <div className="flex items-start gap-3 mb-3 bg-white/60 rounded-lg p-4">
                            <span className="text-blue-500 font-bold text-xl">
                              •
                            </span>
                            <p className="text-gray-700 leading-relaxed">
                              {item.text.split("**").map((part, i) =>
                                i % 2 === 1 ? (
                                  <strong key={i} className="text-gray-900">
                                    {part}
                                  </strong>
                                ) : (
                                  part
                                )
                              )}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-700 leading-relaxed text-lg mb-4">
                            {item.text.split("**").map((part, i) =>
                              i % 2 === 1 ? (
                                <strong key={i} className="text-gray-900">
                                  {part}
                                </strong>
                              ) : (
                                part
                              )
                            )}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Badge de completado */}
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-2xl p-6 text-white text-center shadow-xl border-2 border-green-400/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="bg-white/20 rounded-full p-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <p className="text-xl font-bold">
                  ✅ ¡Felicidades! Has completado este módulo
                </p>
                <p className="text-green-100 text-sm">
                  Sigue aprendiendo para convertirte en un experto del reciclaje
                </p>
              </div>
            </div>

            {/* Consejo adicional */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-5 border-2 border-yellow-300/50 text-center">
              <p className="text-gray-700 font-medium flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                <span>
                  Comparte lo aprendido con tu familia y amigos para multiplicar
                  el impacto
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ModuleView.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
  selectedModule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default ModuleView;

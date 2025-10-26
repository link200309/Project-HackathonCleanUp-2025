import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Youtube } from "lucide-react";
import { videos } from "../VideosData";

const EducationalVideos = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 3;
  const totalPages = Math.ceil(videos.length / videosPerPage);

  const currentVideos = videos.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="mt-28 relative">
      <div className="flex items-center justify-center gap-3 mb-10">
        <Youtube className="w-8 h-8 text-red-500" />
        <h1 className="text-3xl font-bold text-white text-center">
          Videos Educativos
        </h1>
      </div>

      <div className="relative">
        {/* Botón Anterior */}
        <button
          onClick={prevPage}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={totalPages <= 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Grid de Videos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
          >
            {currentVideos.map((video, index) => (
              <motion.div
                key={video.id}
                className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-neutral-800 to-neutral-900 hover:shadow-2xl transition-all group border-2 border-neutral-700 hover:border-green-500"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Thumbnail con efecto hover */}
                <div className="relative aspect-video overflow-hidden bg-neutral-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Play Button */}
                  <a
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-red-600 hover:bg-red-700 rounded-full p-2 transform group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </a>

                  {/* Badge de YouTube */}
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <Youtube className="w-3 h-3" />
                    <span>YouTube</span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2 group-hover:text-green-400 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-neutral-400 text-sm line-clamp-2">
                    {video.description}
                  </p>
                </div>

                {/* Barra inferior animada */}
                <div className="h-1 bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Botón Siguiente */}
        <button
          onClick={nextPage}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={totalPages <= 1}
          aria-label="Página siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicador de página */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentPage
                ? "w-8 bg-green-500"
                : "w-2 bg-neutral-600 hover:bg-neutral-500"
            }`}
            aria-label={`Ir a página ${index + 1}`}
          />
        ))}
      </div>

      {/* Contador de páginas */}
      <p className="text-center text-neutral-300 font-semibold text-sm mt-4">
        {currentPage + 1} de {totalPages} • {videos.length} videos
        totales
      </p>
    </section>
  );
};

export default EducationalVideos;

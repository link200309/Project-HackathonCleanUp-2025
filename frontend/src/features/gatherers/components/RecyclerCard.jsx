import {
  Building2,
  User,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  BadgeCheck,
  Star,
} from "lucide-react";
import PropTypes from "prop-types";

export const RecyclerCard = ({ recycler }) => {
  return (
    <div className="bg-white/95 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-emerald-200/50 hover:border-emerald-400/70 group">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-start gap-4">
          <div
            className={`p-4 rounded-xl shadow-md transition-transform group-hover:scale-110 ${
              recycler.tipo === "empresa"
                ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white"
                : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
            }`}
          >
            {recycler.tipo === "empresa" ? (
              <Building2 className="w-7 h-7" />
            ) : (
              <User className="w-7 h-7" />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {recycler.nombre}
            </h3>
            {recycler.empresa && (
              <p className="text-sm text-gray-600 font-medium">
                {recycler.empresa}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  recycler.tipo === "empresa"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                    : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                }`}
              >
                {recycler.tipo === "empresa" ? "Empresa" : "Individual"}
              </span>
            </div>
          </div>
        </div>
        {recycler.verificado && (
          <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold px-3 py-2 rounded-full shadow-md">
            <BadgeCheck className="w-4 h-4" />
            Verificado
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 mb-5 pb-4 border-b-2 border-emerald-100">
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 rounded-lg border border-yellow-200">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="text-lg font-bold text-gray-800">
            {recycler.rating}
          </span>
        </div>
        <div className="text-gray-600">
          <span className="text-2xl font-bold text-emerald-700">
            {recycler.recolecciones}
          </span>
          <span className="text-sm ml-2">recolecciones</span>
        </div>
      </div>

      {recycler.zona && (
        <div className="flex items-start gap-3 mb-4 bg-emerald-50/50 p-3 rounded-lg border border-emerald-200">
          <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-emerald-800 text-sm">
              {recycler.zona}
            </p>
            <p className="text-sm text-gray-600">{recycler.direccion}</p>
          </div>
        </div>
      )}

      <p className="text-gray-700 text-base leading-relaxed mb-5 line-clamp-3">
        {recycler.descripcion}
      </p>

      <div className="mb-5">
        <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-emerald-500 rounded"></span>
          MATERIALES QUE RECOGE
        </p>
        <div className="flex flex-wrap gap-2">
          {recycler.materiales_recoge.map((material, idx) => (
            <span
              key={idx}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              {material}
            </span>
          ))}
        </div>
      </div>

      {recycler.horario && (
        <div className="flex items-center gap-3 mb-4 bg-white p-3 rounded-lg border border-gray-200">
          <Clock className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="text-xs font-semibold text-gray-500">HORARIO</p>
            <p className="text-sm font-medium text-gray-800">
              {recycler.horario}
            </p>
          </div>
        </div>
      )}

      {recycler.precio_info && (
        <div className="mb-5 bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border-2 border-yellow-300">
          <p className="text-xs font-bold text-yellow-800 mb-1">💰 PRECIOS</p>
          <p className="text-sm font-medium text-gray-800">
            {recycler.precio_info}
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-4 border-t-2 border-emerald-100">
        <a
          href={`tel:${recycler.telefono}`}
          className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3.5 rounded-xl transition-all text-center text-base border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <Phone className="w-5 h-5" />
          Llamar
        </a>
        {recycler.whatsapp && (
          <a
            href={`https://wa.me/591${recycler.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3.5 rounded-xl transition-all text-center text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
};

RecyclerCard.propTypes = {
  recycler: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombre: PropTypes.string.isRequired,
    empresa: PropTypes.string,
    tipo: PropTypes.oneOf(["individual", "empresa"]).isRequired,
    zona: PropTypes.string,
    direccion: PropTypes.string,
    verificado: PropTypes.bool,
    rating: PropTypes.number,
    recolecciones: PropTypes.number,
    descripcion: PropTypes.string,
    materiales_recoge: PropTypes.arrayOf(PropTypes.string).isRequired,
    horario: PropTypes.string,
    precio_info: PropTypes.string,
    telefono: PropTypes.string.isRequired,
    whatsapp: PropTypes.string,
  }).isRequired,
};

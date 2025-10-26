import {
  X,
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  MessageCircle,
} from "lucide-react";
import PropTypes from "prop-types";

export const JoinForm = ({
  showAddForm,
  setShowAddForm,
  setActiveTab,
  formData,
  setFormData,
  handleAddRecycler,
  toggleMaterial,
  materialesDisponibles,
}) => {
  if (!showAddForm) {
    return (
      <div className=" rounded-2xl shadow-2xl p-16 text-center border-2 border-emerald-600/50">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">
            ¿Eres Reciclador?
          </h2>
          <p className="text-neutral-100 text-xl mb-10 leading-relaxed">
            Únete a nuestra red de recicladores y conecta con personas que
            necesitan tus servicios. Es{" "}
            <span className="font-bold text-yellow-400">gratis</span> y te
            ayudará a hacer crecer tu negocio mientras cuidas el planeta.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold py-5 px-12 rounded-xl transition-all shadow-xl hover:shadow-2xl text-xl hover:scale-105 transform"
          >
            Empezar Registro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 rounded-2xl shadow-2xl p-10 border-2 border-emerald-300">
      <div className="flex justify-between items-center mb-10 pb-6 border-b-2 border-emerald-200">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Únete como Reciclador
          </h2>
          <p className="text-gray-600 text-lg">
            Completa tu información para registrarte
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(false);
            setActiveTab("buscar");
          }}
          className="text-gray-500 hover:text-gray-700 p-3 hover:bg-gray-100 rounded-xl transition-all"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded"></span>
            Tipo de cuenta *
          </label>
          <div className="grid grid-cols-2 gap-5">
            <button
              onClick={() => setFormData({ ...formData, tipo: "individual" })}
              className={`p-4 rounded-2xl border-3 transition-all ${
                formData.tipo === "individual"
                  ? "border-emerald-600 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-xl scale-105"
                  : "border-gray-300 hover:border-emerald-400 hover:shadow-lg bg-white"
              }`}
            >
              <User className="w-10 h-10 mx-auto mb-2 text-emerald-600" />
              <div className="font-bold text-xl mb-1">Individual</div>
              <div className="text-sm text-gray-600">Persona física</div>
            </button>
            <button
              onClick={() => setFormData({ ...formData, tipo: "empresa" })}
              className={`p-4 rounded-2xl border-3 transition-all ${
                formData.tipo === "empresa"
                  ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-xl scale-105"
                  : "border-gray-300 hover:border-yellow-400 hover:shadow-lg bg-white"
              }`}
            >
              <Building2 className="w-10 h-10 mx-auto mb-2 text-yellow-600" />
              <div className="font-bold text-xl mb-1">Empresa</div>
              <div className="text-sm text-gray-600">Organización</div>
            </button>
          </div>
        </div>

        <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-200">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            Información Personal
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nombre / Nombre de contacto *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all bg-white"
                placeholder="Tu nombre completo"
              />
            </div>

            {formData.tipo === "empresa" && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nombre de la Empresa
                </label>
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) =>
                    setFormData({ ...formData, empresa: e.target.value })
                  }
                  className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all bg-white"
                  placeholder="Nombre de tu empresa"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-50/50 p-6 rounded-xl border border-yellow-200">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-yellow-600" />
            Información de Contacto
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all bg-white"
                placeholder="71234567"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                WhatsApp
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
                className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all bg-white"
                placeholder="71234567"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all bg-white"
                placeholder="tu@email.com"
              />
            </div>
          </div>
        </div>

        <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-200">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            Ubicación
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) =>
                  setFormData({ ...formData, direccion: e.target.value })
                }
                className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all bg-white"
                placeholder="Calle, número, referencia"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Zona
              </label>
              <select
                value={formData.zona}
                onChange={(e) =>
                  setFormData({ ...formData, zona: e.target.value })
                }
                className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all bg-white cursor-pointer"
              >
                <option value="">Selecciona zona</option>
                <option value="Norte">Norte</option>
                <option value="Sur">Sur</option>
                <option value="Este">Este</option>
                <option value="Oeste">Oeste</option>
                <option value="Centro">Centro</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-300">
          <label className="block text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded"></span>
            Materiales que recoges / aceptas *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {materialesDisponibles.map((mat) => (
              <button
                key={mat}
                type="button"
                onClick={() => toggleMaterial(mat, "materiales_recoge")}
                className={`p-4 rounded-xl text-base font-semibold transition-all border-2 ${
                  formData.materiales_recoge.includes(mat)
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg border-emerald-700 scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-emerald-400 hover:shadow-md"
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-300">
          <label className="block text-base font-bold text-gray-800 mb-3">
            Descripción de tu servicio
          </label>
          <textarea
            value={formData.descripcion}
            onChange={(e) =>
              setFormData({ ...formData, descripcion: e.target.value })
            }
            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
            rows="5"
            placeholder="Describe tu servicio, experiencia, condiciones de trabajo..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-yellow-50/50 p-6 rounded-xl border border-yellow-200">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              Horario de atención
            </label>
            <input
              type="text"
              value={formData.horario}
              onChange={(e) =>
                setFormData({ ...formData, horario: e.target.value })
              }
              className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all bg-white"
              placeholder="Ej: Lun-Sab 8:00-18:00"
            />
          </div>

          <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-200">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-600" />
              Información de precios (opcional)
            </label>
            <input
              type="text"
              value={formData.precio_info}
              onChange={(e) =>
                setFormData({ ...formData, precio_info: e.target.value })
              }
              className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all bg-white"
              placeholder="Ej: Botellas PET Bs. 3/kg"
            />
          </div>
        </div>

        <div className="flex gap-5 pt-8 border-t-2 border-emerald-200">
          <button
            onClick={() => {
              setShowAddForm(false);
              setActiveTab("buscar");
            }}
            className="flex-1 bg-white hover:bg-gray-100 text-gray-700 font-bold py-5 text-lg rounded-xl transition-all border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddRecycler}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold py-5 text-lg rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            Registrarme como Reciclador
          </button>
        </div>
      </div>
    </div>
  );
};

JoinForm.propTypes = {
  showAddForm: PropTypes.bool.isRequired,
  setShowAddForm: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleAddRecycler: PropTypes.func.isRequired,
  toggleMaterial: PropTypes.func.isRequired,
  materialesDisponibles: PropTypes.array.isRequired,
};

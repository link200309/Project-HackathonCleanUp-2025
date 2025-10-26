import { useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Building2,
  User,
  Plus,
  Filter,
  Star,
  Recycle,
  Package,
  X,
  Check,
} from "lucide-react";
import Header from "../../../components/Header";

const RecyclersMarketplace = () => {
  const [activeTab, setActiveTab] = useState("buscar");
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [filterMaterial, setFilterMaterial] = useState("todos");

  // Estados para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "individual",
    empresa: "",
    telefono: "",
    email: "",
    direccion: "",
    zona: "",
    materiales_recoge: [],
    materiales_ofrece: [],
    descripcion: "",
    horario: "",
    precio_info: "",
    whatsapp: "",
  });

  const [recyclers, setRecyclers] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      tipo: "individual",
      telefono: "71234567",
      whatsapp: "71234567",
      email: "juan@email.com",
      direccion: "Av. América #123",
      zona: "Norte",
      materiales_recoge: ["Botellas PET", "Papel", "Cartón"],
      materiales_ofrece: ["Compost orgánico"],
      rating: 4.5,
      recolecciones: 45,
      descripcion:
        "Recojo materiales reciclables en zona norte. Servicio a domicilio sin costo adicional.",
      horario: "Lun-Sab 8:00-18:00",
      verificado: true,
    },
    {
      id: 2,
      nombre: "EcoRecicla Bolivia",
      tipo: "empresa",
      empresa: "EcoRecicla SRL",
      telefono: "44123456",
      whatsapp: "71987654",
      email: "contacto@ecorecicla.com",
      direccion: "Calle Sucre #456",
      zona: "Centro",
      materiales_recoge: ["Plástico", "Vidrio", "Metal", "Electrónicos"],
      materiales_ofrece: ["Papel reciclado", "Bolsas ecológicas"],
      rating: 4.8,
      recolecciones: 230,
      descripcion:
        "Empresa certificada con 10 años de experiencia. Ofrecemos comprobantes y precios competitivos.",
      horario: "Lun-Vie 8:00-19:00, Sáb 9:00-14:00",
      precio_info: "Botellas PET: Bs. 3/kg, Papel: Bs. 1.5/kg",
      verificado: true,
    },
    {
      id: 3,
      nombre: "María González",
      tipo: "individual",
      telefono: "68765432",
      whatsapp: "68765432",
      direccion: "Zona Sud, Calle Los Pinos",
      zona: "Sur",
      materiales_recoge: ["Botellas de vidrio", "Latas de aluminio"],
      materiales_ofrece: [],
      rating: 4.2,
      recolecciones: 28,
      descripcion:
        "Reciclo vidrio y aluminio. Pago justo por material limpio y separado.",
      horario: "Fines de semana",
      verificado: false,
    },
  ]);

  const materialesDisponibles = [
    "Botellas PET",
    "Papel",
    "Cartón",
    "Vidrio",
    "Metal",
    "Latas de aluminio",
    "Plástico",
    "Electrónicos",
    "Baterías",
    "Aceite usado",
    "Ropa/Textiles",
    "Orgánicos",
  ];

  const handleAddRecycler = () => {
    if (
      !formData.nombre ||
      !formData.telefono ||
      formData.materiales_recoge.length === 0
    ) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    const newRecycler = {
      id: Date.now(),
      ...formData,
      rating: 0,
      recolecciones: 0,
      verificado: false,
    };

    setRecyclers([newRecycler, ...recyclers]);
    setShowAddForm(false);
    setFormData({
      nombre: "",
      tipo: "individual",
      empresa: "",
      telefono: "",
      email: "",
      direccion: "",
      zona: "",
      materiales_recoge: [],
      materiales_ofrece: [],
      descripcion: "",
      horario: "",
      precio_info: "",
      whatsapp: "",
    });
    setActiveTab("buscar");
  };

  const toggleMaterial = (material, field) => {
    const current = formData[field];
    if (current.includes(material)) {
      setFormData({
        ...formData,
        [field]: current.filter((m) => m !== material),
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...current, material],
      });
    }
  };

  const filteredRecyclers = recyclers.filter((r) => {
    const matchSearch =
      r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.zona?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.materiales_recoge.some((m) =>
        m.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchType = filterType === "todos" || r.tipo === filterType;
    const matchMaterial =
      filterMaterial === "todos" ||
      r.materiales_recoge.includes(filterMaterial) ||
      r.materiales_ofrece.includes(filterMaterial);

    return matchSearch && matchType && matchMaterial;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <Header
        title="Red de Recicladores"
        description="Conecta, recicla y transforma tu comunidad"
        rightContent={
          <div className="text-right">
            <div className="text-2xl font-bold text-white drop-shadow">
              {recyclers.length}
            </div>
            <div className="text-sm text-yellow-100 font-semibold">
              Recicladores activos
            </div>
          </div>
        }
        icon="Recycle"
      />

      {/* Tabs */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex">
          <button
            onClick={() => setActiveTab("buscar")}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === "buscar"
                ? "bg-emerald-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Search className="w-5 h-5 inline mr-2" />
            Buscar Recicladores
          </button>
          <button
            onClick={() => setActiveTab("ofrecer")}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === "ofrecer"
                ? "bg-emerald-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Package className="w-5 h-5 inline mr-2" />
            Ofrece Materiales
          </button>
          <button
            onClick={() => {
              setActiveTab("unirse");
              setShowAddForm(true);
            }}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === "unirse"
                ? "bg-emerald-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Únete como Reciclador
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Búsqueda de Recicladores */}
        {activeTab === "buscar" && (
          <div className="space-y-6">
            {/* Filtros */}
            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-4">
                <Filter className="w-5 h-5" />
                Filtros de búsqueda
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre, zona o material..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="todos">Todos</option>
                    <option value="individual">Individuales</option>
                    <option value="empresa">Empresas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material
                  </label>
                  <select
                    value={filterMaterial}
                    onChange={(e) => setFilterMaterial(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="todos">Todos los materiales</option>
                    {materialesDisponibles.map((mat) => (
                      <option key={mat} value={mat}>
                        {mat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Lista de Recicladores */}
            <div className="grid gap-6">
              {filteredRecyclers.map((recycler) => (
                <div
                  key={recycler.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
                            recycler.tipo === "empresa"
                              ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                              : "bg-gradient-to-br from-emerald-500 to-teal-600"
                          }`}
                        >
                          {recycler.tipo === "empresa" ? (
                            <Building2 className="w-8 h-8" />
                          ) : (
                            <User className="w-8 h-8" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-800">
                              {recycler.nombre}
                            </h3>
                            {recycler.verificado && (
                              <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Verificado
                              </div>
                            )}
                          </div>
                          {recycler.empresa && (
                            <p className="text-gray-600 text-sm">
                              {recycler.empresa}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">
                                {recycler.rating.toFixed(1)}
                              </span>
                            </div>
                            <div className="text-gray-400">•</div>
                            <span>{recycler.recolecciones} recolecciones</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          recycler.tipo === "empresa"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {recycler.tipo === "empresa" ? "Empresa" : "Individual"}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{recycler.descripcion}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                          <Recycle className="w-4 h-4" />
                          Materiales que recoge:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {recycler.materiales_recoge.map((mat) => (
                            <span
                              key={mat}
                              className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {recycler.materiales_ofrece.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Materiales que ofrece:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {recycler.materiales_ofrece.map((mat) => (
                              <span
                                key={mat}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm">{recycler.direccion}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm">{recycler.telefono}</span>
                        </div>
                        {recycler.email && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <Mail className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm">{recycler.email}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        {recycler.horario && (
                          <div className="text-sm text-gray-700">
                            <span className="font-semibold">Horario:</span>{" "}
                            {recycler.horario}
                          </div>
                        )}
                        {recycler.precio_info && (
                          <div className="text-sm text-gray-700">
                            <span className="font-semibold">Precios:</span>{" "}
                            {recycler.precio_info}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {recycler.whatsapp && (
                        <a
                          href={`https://wa.me/591${recycler.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                        >
                          WhatsApp
                        </a>
                      )}
                      <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                        <Phone className="w-5 h-5" />
                        Contactar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ofrecer Materiales */}
        {activeTab === "ofrecer" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ¿Tienes materiales para reciclar?
              </h2>
              <p className="text-gray-600 mb-6">
                Encuentra recicladores que acepten tus materiales. Usa los
                filtros para buscar por tipo de material.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {materialesDisponibles.map((material) => {
                  const count = recyclers.filter((r) =>
                    r.materiales_recoge.includes(material)
                  ).length;
                  return (
                    <button
                      key={material}
                      onClick={() => {
                        setFilterMaterial(material);
                        setActiveTab("buscar");
                      }}
                      className="bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 p-4 rounded-lg border-2 border-emerald-200 transition-all"
                    >
                      <div className="font-semibold text-gray-800">
                        {material}
                      </div>
                      <div className="text-sm text-emerald-700 mt-1">
                        {count} recicladores disponibles
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Formulario para Unirse */}
        {activeTab === "unirse" && showAddForm && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Únete como Reciclador
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setActiveTab("buscar");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Tipo de cuenta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de cuenta *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      setFormData({ ...formData, tipo: "individual" })
                    }
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.tipo === "individual"
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <User className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                    <div className="font-semibold">Individual</div>
                  </button>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, tipo: "empresa" })
                    }
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.tipo === "empresa"
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Building2 className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                    <div className="font-semibold">Empresa</div>
                  </button>
                </div>
              </div>

              {/* Información básica */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre / Nombre de contacto *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {formData.tipo === "empresa" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la Empresa / Organización
                    </label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) =>
                        setFormData({ ...formData, empresa: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                )}
              </div>

              {/* Contacto */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="71234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="71234567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Ubicación */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) =>
                      setFormData({ ...formData, direccion: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Calle, número, referencia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zona
                  </label>
                  <select
                    value={formData.zona}
                    onChange={(e) =>
                      setFormData({ ...formData, zona: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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

              {/* Materiales que recoge */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materiales que recoges / aceptas *
                </label>
                <div className="grid md:grid-cols-4 gap-2">
                  {materialesDisponibles.map((mat) => (
                    <button
                      key={mat}
                      type="button"
                      onClick={() => toggleMaterial(mat, "materiales_recoge")}
                      className={`p-2 rounded-lg text-sm font-medium transition-all ${
                        formData.materiales_recoge.includes(mat)
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Materiales que ofrece */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materiales que ofreces (opcional)
                </label>
                <div className="grid md:grid-cols-4 gap-2">
                  {materialesDisponibles.map((mat) => (
                    <button
                      key={mat}
                      type="button"
                      onClick={() => toggleMaterial(mat, "materiales_ofrece")}
                      className={`p-2 rounded-lg text-sm font-medium transition-all ${
                        formData.materiales_ofrece.includes(mat)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción de tu servicio
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows="3"
                  placeholder="Describe tu servicio, experiencia, condiciones de trabajo..."
                />
              </div>

              {/* Horario y precios */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horario de atención
                  </label>
                  <input
                    type="text"
                    value={formData.horario}
                    onChange={(e) =>
                      setFormData({ ...formData, horario: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Ej: Lun-Sab 8:00-18:00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Información de precios (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.precio_info}
                    onChange={(e) =>
                      setFormData({ ...formData, precio_info: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Ej: Botellas PET Bs. 3/kg"
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setActiveTab("buscar");
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddRecycler}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all"
                >
                  Registrarme como Reciclador
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer informativo */}
      <div className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">¿Cómo funciona?</h3>
              <p className="text-gray-300 text-sm">
                Conecta personas que tienen materiales reciclables con
                recicladores que los necesitan. ¡Juntos creamos una economía
                circular!
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Beneficios</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>✓ Gana dinero reciclando</li>
                <li>✓ Ayuda al medio ambiente</li>
                <li>✓ Conecta con tu comunidad</li>
                <li>✓ Servicio gratuito</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Estadísticas</h3>
              <div className="text-gray-300 text-sm space-y-2">
                <div>{recyclers.length} recicladores registrados</div>
                <div>
                  {recyclers.reduce((sum, r) => sum + r.recolecciones, 0)}{" "}
                  recolecciones realizadas
                </div>
                <div>{materialesDisponibles.length} tipos de materiales</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclersMarketplace;

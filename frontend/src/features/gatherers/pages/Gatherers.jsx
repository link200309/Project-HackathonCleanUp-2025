import { useState } from "react";
import { recyclersData, materialesDisponibles } from "../GatherersData";
import TabsBar from "../components/TabsBar";
import { SearchTab } from "../components/SearchTab";
import { JoinForm } from "../components/JoinTab";

const RecyclersMarketplace = () => {
  const [activeTab, setActiveTab] = useState("buscar");
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [filterMaterial, setFilterMaterial] = useState("todos");

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

  const [recyclers, setRecyclers] = useState(recyclersData);

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
    <div className="min-h-screen">
      <TabsBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowAddForm={setShowAddForm}
      />

      <div className="max-w-6xl mx-auto p-6">
        {activeTab === "buscar" && (
          <SearchTab
            recyclers={recyclers}
            filteredRecyclers={filteredRecyclers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            filterMaterial={filterMaterial}
            setFilterMaterial={setFilterMaterial}
            materialesDisponibles={materialesDisponibles}
          />
        )}

        {activeTab === "unirse" && (
          <JoinForm
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm}
            setActiveTab={setActiveTab}
            formData={formData}
            setFormData={setFormData}
            handleAddRecycler={handleAddRecycler}
            toggleMaterial={toggleMaterial}
            materialesDisponibles={materialesDisponibles}
          />
        )}
      </div>

      {/* Footer informativo */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-bold text-xl mb-4 text-emerald-400">
                ¿Cómo funciona?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Conecta personas que tienen materiales reciclables con
                recicladores que los necesitan. ¡Juntos creamos una economía
                circular!
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 text-emerald-400">
                Beneficios
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  Gana dinero reciclando
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  Ayuda al medio ambiente
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  Conecta con tu comunidad
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  Servicio gratuito
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 text-emerald-400">
                Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-3xl font-bold text-white">
                    {recyclers.length}
                  </div>
                  <div className="text-gray-300 text-sm">
                    Recicladores registrados
                  </div>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-3xl font-bold text-white">
                    {recyclers.reduce((sum, r) => sum + r.recolecciones, 0)}
                  </div>
                  <div className="text-gray-300 text-sm">
                    Recolecciones realizadas
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>Plataforma de Reciclaje Comunitario • Cochabamba, Bolivia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclersMarketplace;

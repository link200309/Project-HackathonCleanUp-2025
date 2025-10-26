import PropTypes from "prop-types";
import { Search, Package, Plus } from "lucide-react";

const TabsBar = ({ activeTab, setActiveTab, setShowAddForm }) => {
  const tabs = [
    { id: "buscar", label: "Buscar Recicladores", icon: Search },
    { id: "ofrecer", label: "Ofrece Materiales", icon: Package },
    { id: "unirse", label: "Únete como Reciclador", icon: Plus },
  ];

  return (
    <div className="bg-gradient-to-r from-emerald-800 to-green-700 border-yellow-400 shadow-md">
      <div className="max-w-6xl mx-auto flex">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              if (id === "unirse") setShowAddForm(true);
            }}
            className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === id ? "border-b-4 border-yellow-400 text-yellow-400" : "text-neutral-300 hover:text-neutral-100"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

TabsBar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  setShowAddForm: PropTypes.func.isRequired,
};

export default TabsBar;

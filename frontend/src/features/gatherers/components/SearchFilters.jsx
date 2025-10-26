import PropTypes from "prop-types";

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterMaterial,
  setFilterMaterial,
  materialesDisponibles,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-100 mb-2">
            Buscar
          </label>
          <input
            type="text"
            placeholder="Nombre, zona o material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-emerald-900/30 text-neutral-100 placeholder-emerald-300/50 px-4 py-2 border border-emerald-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-100 mb-2">
            Tipo
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full bg-emerald-900/30 text-neutral-300 px-4 py-2 border border-emerald-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all cursor-pointer"
          >
            <option value="todos" className="bg-emerald-900 text-neutral-300">Todos</option>
            <option value="individual" className="bg-emerald-900 text-neutral-300">Individuales</option>
            <option value="empresa" className="bg-emerald-900 text-neutral-300">Empresas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-100 mb-2">
            Material
          </label>
          <select
            value={filterMaterial}
            onChange={(e) => setFilterMaterial(e.target.value)}
            className="w-full bg-emerald-900/30 text-neutral-300 px-4 py-2 border border-emerald-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all cursor-pointer"
          >
            <option value="todos" className="bg-emerald-900 text-neutral-300">Todos los materiales</option>
            {materialesDisponibles.map((mat) => (
              <option key={mat} value={mat} className="bg-emerald-900 text-neutral-300">
                {mat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

SearchFilters.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired,
  setFilterType: PropTypes.func.isRequired,
  filterMaterial: PropTypes.string.isRequired,
  setFilterMaterial: PropTypes.func.isRequired,
  materialesDisponibles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchFilters;
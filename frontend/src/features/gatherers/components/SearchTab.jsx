import { RecyclerCard } from "./RecyclerCard";
import PropTypes from "prop-types";
import SearchFilters from "./SearchFilters";

export const SearchTab = ({
  filteredRecyclers,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterMaterial,
  setFilterMaterial,
  materialesDisponibles,
}) => {
  return (
    <div className="space-y-6">
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        filterMaterial={filterMaterial}
        setFilterMaterial={setFilterMaterial}
        materialesDisponibles={materialesDisponibles}
      />

      <div>
        <h2 className="text-2xl font-bold text-neutral-100 mb-4">
          {filteredRecyclers.length} recicladores encontrados
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredRecyclers.map((recycler) => (
            <RecyclerCard key={recycler.id} recycler={recycler} />
          ))}
        </div>
      </div>
    </div>
  );
};

SearchTab.propTypes = {
  filteredRecyclers: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired,
  setFilterType: PropTypes.func.isRequired,
  filterMaterial: PropTypes.string.isRequired,
  setFilterMaterial: PropTypes.func.isRequired,
  materialesDisponibles: PropTypes.array.isRequired,
};

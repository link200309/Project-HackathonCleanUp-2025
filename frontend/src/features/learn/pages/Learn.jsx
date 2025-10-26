import { useState } from "react";
import HomeView from "./HomeView";
import CategoryDetailView from "./CategoryDetailView";
import ModuleView from "./ModuleView";

function Learn() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <div className="min-h-screen">
      {currentView === "home" && (
        <HomeView
          setCurrentView={setCurrentView}
          setSelectedCategory={setSelectedCategory}
          setSelectedModule={setSelectedModule}
        />
      )}

      {currentView === "detail" && (
        <CategoryDetailView
          setCurrentView={setCurrentView}
          selectedCategory={selectedCategory}
        />
      )}

      {currentView === "module" && (
        <ModuleView
          setCurrentView={setCurrentView}
          selectedModule={selectedModule}
        />
      )}
    </div>
  );
}

export default Learn;

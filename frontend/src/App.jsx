import { useState } from "react";
import Home from "./pages/home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [client] = useState(() => new QueryClient());
  return (
    <div className="bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700">
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" />
            <Route path="/scanner" />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;

// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterAddress from "./pages/RegisterAddress";
import EditAddress from "./pages/EditAddress";

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/register">Cadastrar Endereço</Link>
          </li>
          <li>
            <Link to="/edit">Editar Endereço</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/register" element={<RegisterAddress />} />
        <Route path="/edit" element={<EditAddress />} />
      </Routes>
    </Router>
  );
};

export default App;

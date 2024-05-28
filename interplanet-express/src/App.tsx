import { Container } from "@mui/material";
import React, { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddressList from "./components/AddressList";
import { Address } from "./interfaces/Address";
import EditAddress from "./pages/EditAddress";
import RegisterAddress from "./pages/RegisterAddress";

const App: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const addAddress = (newAddress: Address) => {
    setAddresses([...addresses, newAddress]);
  };

  interface RegisterAddressProps {
    addAddress: (newAddress: Address) => void;
  }

  return (
    <Router>
      <Container>
        <nav>
          <ul>
            <li>
              <Link to="/">Listar</Link>
            </li>
            <li>
              <Link to="/register">Cadastrar Endereço</Link>
            </li>
            <li>
              <Link to="/edit">Editar Endereço</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<AddressList addresses={addresses} />} />
          <Route
            path="/register"
            element={<RegisterAddress addAddress={addAddress} />}
          />
          <Route path="/edit" element={<EditAddress />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

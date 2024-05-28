import { Container, CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import AddressList from './components/AddressList';
import { Address } from './interfaces/Address';
import EditAddress from './pages/EditAddress';
import RegisterAddress from './pages/RegisterAddress';

const App: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const addAddress = (newAddress: Address) => {
    setAddresses([...addresses, newAddress]);
  };

  const updateAddress = (updatedAddress: Address) => {
    setAddresses(addresses.map(addr => (addr === selectedAddress ? updatedAddress : addr)));
    setSelectedAddress(null);
  };

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Address Manager
          </Typography>
          <Button color="inherit" component={Link} to="/">Listar</Button>
          <Button color="inherit" component={Link} to="/register">Cadastrar Endereço</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4}>
          <Routes>
            <Route
              path="/"
              element={<AddressList addresses={addresses} setSelectedAddress={setSelectedAddress} />}
            />
            <Route
              path="/register"
              element={<RegisterAddress addAddress={addAddress} />}
            />
            <Route
              path="/edit"
              element={
                <EditAddress
                  address={selectedAddress}
                  updateAddress={updateAddress}
                />
              }
            />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;

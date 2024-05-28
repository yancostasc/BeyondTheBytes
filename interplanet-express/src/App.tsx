import { Container, CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddressList from './components/AddressList';
import { Address } from './interfaces/Address';
import EditAddress from './pages/EditAddress';
import RegisterAddress from './pages/RegisterAddress';

const App: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const addAddress = (newAddress: Address) => {
    setAddresses([...addresses, newAddress]);
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
          <Button color="inherit" component={Link} to="/edit">Editar Endereço</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4}>
          <Routes>
            <Route path="/" element={<AddressList addresses={addresses} />} />
            <Route path="/register" element={<RegisterAddress addAddress={addAddress} />} />
            <Route path="/edit" element={<EditAddress />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;

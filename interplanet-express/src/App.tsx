import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { LocalShipping } from "@mui/icons-material";
import React, { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddressList from "./components/AddressList";
import { Address } from "./interfaces/Address";
import EditAddress from "./pages/EditAddress";
import RegisterAddress from "./pages/RegisterAddress";

const App: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isNewAddressAdded, setIsNewAddressAdded] = useState<boolean>(false);

  const addAddress = (newAddress: Address) => {
    setAddresses([...addresses, newAddress]);
    setIsNewAddressAdded(true);
  };

  const updateAddress = (updatedAddress: Address) => {
    setAddresses(
      addresses.map((addr) =>
        addr === selectedAddress ? updatedAddress : addr
      )
    );
    setSelectedAddress(null);
  };

  const deleteAddress = (addressToDelete: Address) => {
    setAddresses(addresses.filter((address) => address !== addressToDelete));
  };

  return (
    <Router>
      <CssBaseline />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            width: "100%",
            maxWidth: "800px",
            borderRadius: "8px 8px 0 0",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <AppBar position="static" sx={{ borderRadius: "8px 8px 0 0" }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Interplanet Express
              </Typography>
              <Tooltip title="Deliveries">
                <IconButton color="inherit" component={Link} to="/">
                  <LocalShipping />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          sx={{
            backgroundColor: "#fff",
            width: "100%",
            maxWidth: "800px",
            borderRadius: "0 0 8px 8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <AddressList
                  addresses={addresses}
                  setSelectedAddress={setSelectedAddress}
                  deleteAddress={deleteAddress}
                  isNewAddressAdded={isNewAddressAdded}
                />
              }
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

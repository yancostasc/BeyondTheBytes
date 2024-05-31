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
import { RocketLaunchOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DeliveryList from "./components/DeliveryList";
import { Delivery } from "./interfaces/Delivery";
import EditDelivery from "./pages/EditDelivery";
import RegisterDelivery from "./pages/RegisterDelivery";
import ViewDelivery from "./pages/ViewDelivery";

const App: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );
  const [isNewDeliveryAdded, setIsNewDeliveryAdded] = useState<boolean>(false);
  const [isDeliveryEdited, setIsDeliveryEdited] = useState<boolean>(false);

  const addDelivery = (newDelivery: Delivery) => {
    setDeliveries([...deliveries, newDelivery]);
    setIsNewDeliveryAdded(true);
  };

  const updateDelivery = (updatedDelivery: Delivery) => {
    setDeliveries(
      deliveries.map((delivery) =>
        delivery === selectedDelivery ? updatedDelivery : delivery
      )
    );
    setIsNewDeliveryAdded(false);
    setSelectedDelivery(null);
    setIsDeliveryEdited(true);
  };

  const deleteDelivery = (deliveryToDelete: Delivery) => {
    setIsNewDeliveryAdded(false);
    setDeliveries(
      deliveries.filter((deliveries) => deliveries !== deliveryToDelete)
    );
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
            width: "100%",
            maxWidth: "800px",
            borderRadius: "8px 8px 0 0",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <AppBar
            position="static"
            sx={{ borderRadius: "8px 8px 0 0", backgroundColor: "#8A2BE2" }}
          >
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Interplanet Express
              </Typography>
              <Tooltip title="Deliveries">
                <IconButton color="inherit" component={Link} to="/">
                  <RocketLaunchOutlined />
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
                <DeliveryList
                  Deliveries={deliveries}
                  setSelectedDelivery={setSelectedDelivery}
                  deleteDelivery={deleteDelivery}
                  isNewDeliveryAdded={isNewDeliveryAdded}
                  isDeliveryEdited={isDeliveryEdited}
                />
              }
            />
            <Route
              path="/register"
              element={<RegisterDelivery addDelivery={addDelivery} />}
            />
            <Route
              path="/view/:deliveryId"
              element={<ViewDelivery delivery={selectedDelivery} />}
            />
            <Route
              path="/edit/:deliveryId"
              element={
                <EditDelivery
                  updateDelivery={updateDelivery}
                  delivery={selectedDelivery}
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

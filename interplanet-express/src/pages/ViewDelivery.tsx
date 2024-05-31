import React from "react";
import {
  Typography,
  Box,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { ViewDeliveryProps } from "../interfaces/ViewDeliveryProps";
import { Link as RouterLink } from "react-router-dom";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { Planet } from "../enums/Planet";

const ViewDelivery: React.FC<ViewDeliveryProps> = ({ delivery }) => {
  if (!delivery) {
    return (
      <Typography variant="h6" gutterBottom>
        Delivery not found
      </Typography>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="body2" sx={{ mr: 1 }}>
          &lt;
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink
            component={RouterLink}
            to="/"
            underline="hover"
            color="inherit"
          >
            Deliveries
          </MuiLink>
          <Typography color="text.primary">View Delivery</Typography>
        </Breadcrumbs>
      </Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Delivery Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box p={2}>
            <MapContainer
              center={[
                delivery.destinationLatitude,
                delivery.destinationLongitude,
              ]}
              zoom={12}
              style={{
                height: "300px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
              zoomControl={false}
              dragging={false}
              attributionControl={false}
              doubleClickZoom={false}
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Circle
                center={[
                  delivery.destinationLatitude,
                  delivery.destinationLongitude,
                ]}
                radius={50000}
                pathOptions={{
                  fillColor:
                    delivery.destinationPlanet === Planet.Mars
                      ? "rgba(255, 182, 169, 0.5)"
                      : "rgba(160, 198, 232, 0.5)",
                  color:
                    delivery.destinationPlanet === Planet.Mars
                      ? "rgba(255, 182, 169, 0.8)"
                      : "rgba(160, 198, 232, 0.8)",
                }}
              />
            </MapContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={2}>
            <Typography variant="h6" component="h3" gutterBottom>
              <strong>Origin</strong>
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              <strong>Location:</strong> {delivery.originLocation}
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              <strong>Planet:</strong> {delivery.originPlanet}
            </Typography>
          </Box>
          <Box p={2}>
            <Typography variant="h6" component="h3" gutterBottom>
              <strong>Destination</strong>
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              <strong>Location:</strong> {delivery.destinationLocation}
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              <strong>Planet:</strong> {delivery.destinationPlanet}
            </Typography>
          </Box>
          <Box p={2}>
            <Typography variant="h6" component="h3" gutterBottom>
              <strong>Description</strong>
            </Typography>
            <Typography
              variant="body2"
              sx={{ overflowWrap: "break-word", color: "#757575" }}
            >
              {delivery.packageDescription}
            </Typography>
          </Box>
          <Box p={2}>
            <Typography variant="h6" component="h3" gutterBottom>
              <strong>Notes</strong>
            </Typography>
            <Typography
              variant="body2"
              sx={{ overflowWrap: "break-word", color: "#757575" }}
            >
              {delivery.notes}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewDelivery;

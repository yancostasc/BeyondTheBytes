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
        <Grid item xs={12}>
          <Box p={2}>
            <Typography variant="h6" component="h3" gutterBottom>
              Destination Delivery
            </Typography>
            <MapContainer
              center={[
                delivery.destinationLatitude,
                delivery.destinationLongitude,
              ]}
              zoom={15}
              style={{
                height: "400px",
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
        <Grid item xs={3}>
          <Box p={2}>
            <Typography variant="h6" component="h3" gutterBottom>
              Origin
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              Location: {delivery.originLocation}
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              Planet: {delivery.originPlanet}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box p={2}>
            <Typography variant="h6" component="h3" gutterBottom>
              Destination
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              Location: {delivery.destinationLocation}
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              Planet: {delivery.destinationPlanet}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box p={2}>
            <Typography variant="h6" component="h3" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              {delivery.packageDescription}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box p={2}>
            <Typography variant="h6" component="h3" gutterBottom>
              Notes
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              {delivery.notes}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewDelivery;

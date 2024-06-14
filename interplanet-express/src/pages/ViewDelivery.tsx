import React from "react";
import {
  Typography,
  Box,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
  Card,
  CardContent,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { Planet } from "../enums/Planet";
import { ViewDeliveryProps } from "../interfaces/ViewDeliveryProps";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteIcon from "@mui/icons-material/Note";

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
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          Delivery Details
        </Typography>
      </Box>
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
              zoomControl={true}
              attributionControl={false}
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
                      ? "rgba(255, 99, 132, 0.5)"
                      : "rgba(54, 162, 235, 0.5)",
                  color:
                    delivery.destinationPlanet === Planet.Mars
                      ? "rgba(255, 99, 132, 0.8)"
                      : "rgba(54, 162, 235, 0.8)",
                }}
              />
            </MapContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={2}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  <LocationOnIcon sx={{ mr: 1, color: "#8A2BE2" }} />
                  <strong>Origin</strong>
                </Typography>
                <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
                  <strong>Location:</strong> {delivery.originLocation}
                </Typography>
                <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
                  <strong>Planet:</strong> {delivery.originPlanet}
                </Typography>
              </CardContent>
            </Card>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  <LocationOnIcon sx={{ mr: 1, color: "#8A2BE2" }} />
                  <strong>Destination</strong>
                </Typography>
                <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
                  <strong>Location:</strong> {delivery.destinationLocation}
                </Typography>
                <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
                  <strong>Planet:</strong> {delivery.destinationPlanet}
                </Typography>
              </CardContent>
            </Card>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  <DescriptionIcon sx={{ mr: 1, color: "#8A2BE2" }} />
                  <strong>Description</strong>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ overflowWrap: "break-word", color: "#757575" }}
                >
                  {delivery.packageDescription}
                </Typography>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  <NoteIcon sx={{ mr: 1, color: "#8A2BE2" }} />
                  <strong>Notes</strong>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ overflowWrap: "break-word", color: "#757575" }}
                >
                  {delivery.notes}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewDelivery;

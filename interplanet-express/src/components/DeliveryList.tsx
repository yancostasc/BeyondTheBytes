import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  DeleteOutlineOutlined,
  AddCircleOutline,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Tooltip,
  Snackbar,
  Alert,
  Icon,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Planet } from "../enums/Planet";
import { Delivery } from "../interfaces/Delivery";
import { DeliveryListProps } from "../interfaces/DeliveryListProps";
import { pink } from "@mui/material/colors";
import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DeliveryList: React.FC<DeliveryListProps> = ({
  Deliveries,
  setSelectedDelivery,
  deleteDelivery,
  isNewDeliveryAdded,
  isDeliveryEdited,
}) => {
  const navigate = useNavigate();
  const [showNewDeliveryAlert, setShowNewDeliveryAlert] = useState(false);
  const [showEditedDeliveryAlert, setShowEditedDeliveryAlert] = useState(false);

  useEffect(() => {
    if (isNewDeliveryAdded) {
      setShowNewDeliveryAlert(true);
      const timeout = setTimeout(() => {
        setShowNewDeliveryAlert(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isNewDeliveryAdded]);

  useEffect(() => {
    if (isDeliveryEdited) {
      setShowEditedDeliveryAlert(true);
      const timeout = setTimeout(() => {
        setShowEditedDeliveryAlert(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isDeliveryEdited]);

  const handleEditClick = (Delivery: Delivery) => {
    setSelectedDelivery(Delivery);
    navigate("/edit");
  };

  const handleDeleteClick = (Delivery: Delivery) => {
    deleteDelivery(Delivery);
  };

  const getPlanetStyle = (planet: string) => {
    return {
      backgroundColor:
        planet === Planet.Earth
          ? "rgb(160 198 232 / 60%)"
          : "rgb(255 182 169 / 60%)",
      color: "black",
      padding: "4px 8px",
      borderRadius: "4px",
      marginRight: "0.5rem",
      fontSize: "10px",
    };
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" component="h2">
          Deliveries
        </Typography>
        <Tooltip title="New Delivery">
          <IconButton color="primary" component={Link} to="/register">
            <AddCircleOutline />
          </IconButton>
        </Tooltip>
      </Box>
      <List>
        {Deliveries.map((delivery, index) => (
          <ListItem key={index} divider>
            <Grid container>
              <Grid item xs={2}>
                <MapContainer
                  center={[
                    delivery.destinationLatitude,
                    delivery.destinationLongitude,
                  ]}
                  zoom={13}
                  style={{
                    height: "100%",
                    width: "100%",
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

                  {delivery.destinationPlanet === Planet.Mars ? (
                    <Circle
                      center={[
                        delivery.destinationLatitude,
                        delivery.destinationLongitude,
                      ]}
                      radius={1000}
                      pathOptions={{
                        fillColor: "rgba(255, 182, 169)", // Cor mais forte para o preenchimento
                        color: "rgba(255, 182, 169)", // Cor mais forte para a borda
                      }}
                    ></Circle>
                  ) : null}
                </MapContainer>
              </Grid>

              <Grid item xs={7} marginLeft={2}>
                <ListItemText
                  primary={delivery.originLocation}
                  secondary={delivery.destinationLocation}
                />
              </Grid>

              <Grid
                item
                xs={2}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
              >
                <Tooltip title="Edit">
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(delivery)}
                  >
                    <EditOutlined color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteClick(delivery)}
                  >
                    <DeleteOutlineOutlined sx={{ color: pink[500] }} />
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid
                item
                xs={12}
                display={"flex"}
                alignItems={"center"}
                marginTop={1}
                marginLeft={1.8}
              >
                <Tooltip title={"Origin Planet"}>
                  <span style={getPlanetStyle(delivery.originPlanet)}>
                    {delivery.originPlanet}
                  </span>
                </Tooltip>
                <Tooltip title={"Destination Planet"}>
                  <span style={getPlanetStyle(delivery.destinationPlanet)}>
                    {delivery.destinationPlanet}
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={showNewDeliveryAlert}
        autoHideDuration={2000}
        onClose={() => setShowNewDeliveryAlert(false)}
      >
        <Alert severity="success" variant="filled">
          New Delivery added!
        </Alert>
      </Snackbar>
      <Snackbar
        open={showEditedDeliveryAlert}
        autoHideDuration={2000}
        onClose={() => setShowEditedDeliveryAlert(false)}
      >
        <Alert severity="success" variant="filled">
          Delivery edited successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DeliveryList;

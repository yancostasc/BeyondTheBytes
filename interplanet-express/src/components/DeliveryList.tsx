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
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Planet } from "../enums/Planet";
import { Delivery } from "../interfaces/Delivery";
import { DeliveryListProps } from "../interfaces/DeliveryListProps";
import { pink } from "@mui/material/colors";

const DeliveryList: React.FC<DeliveryListProps> = ({
  Deliveryes,
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
      backgroundColor: planet === Planet.Earth ? "#A0C6E8" : "#FFB6A9",
      color: "black",
      padding: "4px 8px",
      borderRadius: "4px",
      marginRight: "0.5rem",
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
        {Deliveryes.map((Delivery, index) => (
          <ListItem key={index} divider>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <ListItemText
                  primary={Delivery.originLocation}
                  secondary={Delivery.destinationLocation}
                />
              </Grid>
              <Grid item xs={3} display={"flex"} flexDirection={"row"}>
                <span style={getPlanetStyle(Delivery.originPlanet)}>
                  {Delivery.originPlanet}
                </span>
                <span style={getPlanetStyle(Delivery.destinationPlanet)}>
                  {Delivery.destinationPlanet}
                </span>
              </Grid>
              <Grid item xs={3} display={"flex"} flexDirection={"row-reverse"}>
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteClick(Delivery)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    <DeleteOutlineOutlined sx={{ color: pink[500] }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(Delivery)}
                  >
                    <EditOutlined color="primary" />
                  </IconButton>
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
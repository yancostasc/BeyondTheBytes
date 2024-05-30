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
import { Address } from "../interfaces/Address";
import { AddressListProps } from "../interfaces/AddressListProps";
import { pink } from "@mui/material/colors";

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  setSelectedAddress,
  deleteAddress,
  isNewAddressAdded,
}) => {
  const navigate = useNavigate();
  const [showNewAddressAlert, setShowNewAddressAlert] = useState(false);

  useEffect(() => {
    if (isNewAddressAdded) {
      setShowNewAddressAlert(true);
      const timeout = setTimeout(() => {
        setShowNewAddressAlert(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isNewAddressAdded]);

  const handleEditClick = (address: Address) => {
    setSelectedAddress(address);
    navigate("/edit");
  };

  const handleDeleteClick = (address: Address) => {
    deleteAddress(address);
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
        {addresses.map((address, index) => (
          <ListItem key={index} divider>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <ListItemText
                  primary={address.originLocation}
                  secondary={address.destinationLocation}
                />
              </Grid>
              <Grid item xs={3} display={"flex"} flexDirection={"row"}>
                <span style={getPlanetStyle(address.originPlanet)}>
                  {address.originPlanet}
                </span>
                <span style={getPlanetStyle(address.destinationPlanet)}>
                  {address.destinationPlanet}
                </span>
              </Grid>
              <Grid item xs={3} display={"flex"} flexDirection={"row-reverse"}>
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteClick(address)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    <DeleteOutlineOutlined sx={{ color: pink[500] }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(address)}
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
        open={showNewAddressAlert}
        autoHideDuration={2000}
        onClose={() => setShowNewAddressAlert(false)}
      >
        <Alert severity="success" variant="filled">
          New address added!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddressList;

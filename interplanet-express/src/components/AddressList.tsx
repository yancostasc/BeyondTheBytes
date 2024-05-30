import DeleteIcon from "@mui/icons-material/Delete"; // Importando o ícone de exclusão
import EditIcon from "@mui/icons-material/Edit"; // Importando o ícone de edição
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Planet } from "../enums/Planet";
import { Address } from "../interfaces/Address";
import { AddressListProps } from "../interfaces/AddressListProps";

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  setSelectedAddress,
  deleteAddress,
}) => {
  const navigate = useNavigate();

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
      <Typography variant="h4" component="h2" gutterBottom>
        Deliveries
      </Typography>
      <List>
        {addresses.map((address, index) => (
          <ListItem key={index} divider>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <ListItemText
                  primary={address.packageDescription}
                  secondary={address.notes}
                />
              </Grid>
              <Grid item xs={3} display={"flex"} flexDirection={"row-reverse"}>
                <span style={getPlanetStyle(address.originPlanet)}>
                  {address.originPlanet}
                </span>
                <span style={getPlanetStyle(address.destinationPlanet)}>
                  {address.destinationPlanet}
                </span>
              </Grid>
              <Grid item xs={3} display={"flex"} flexDirection={"row-reverse"}>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditClick(address)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteClick(address)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AddressList;

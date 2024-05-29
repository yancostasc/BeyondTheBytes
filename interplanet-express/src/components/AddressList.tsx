import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { FaGlobe, FaMars } from "react-icons/fa";
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

  const getPlanetIcon = (planet: Planet) => {
    if (planet === Planet.Earth) {
      return <FaGlobe />;
    } else if (planet === Planet.Mars) {
      return <FaMars />;
    }
    return null;
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Lista de Endereços
      </Typography>
      <List>
        {addresses.map((address, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={
                <React.Fragment>
                  {getPlanetIcon(address.originPlanet)}
                  {address.destinationLocation}
                  <span style={{ marginLeft: "0.5rem" }}>
                    {`${address.originPlanet}`}
                  </span>
                </React.Fragment>
              }
              secondary={`${address.packageDescription}`}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEditClick(address)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteClick(address)}
            >
              Excluir
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AddressList;

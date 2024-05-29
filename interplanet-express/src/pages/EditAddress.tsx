import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Planet } from "../enums/Planet";
import { Address } from "../interfaces/Address";
import { EditAddressProps } from "../interfaces/EditAddressProps";

const EditAddress: React.FC<EditAddressProps> = ({
  address,
  updateAddress,
}) => {
  const [originPlanet, setOriginPlanet] = useState<Planet>(Planet.Earth);
  const [destinationPlanet, setDestinationPlanet] = useState<Planet>(
    Planet.Earth
  );
  const [originLocation, setOriginLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (address) {
      setOriginPlanet(address.originPlanet);
      setDestinationPlanet(address.destinationPlanet);
      setOriginLocation(address.originLocation);
      setDestinationLocation(address.destinationLocation);
    }
  }, [address]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      const updatedAddress: Address = {
        originPlanet: address.originPlanet,
        destinationPlanet: address.destinationPlanet,
        destinationLocation: address.destinationLocation,
        packageDescription: address.packageDescription,
        notes: address.notes,
        originLocation: address.originLocation,
      };
      updateAddress(updatedAddress);
      navigate("/");
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Address
      </Typography>
      <form onSubmit={handleUpdate}>
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">Origin Planet</FormLabel>
          <RadioGroup
            row
            aria-label="originPlanet"
            name="originPlanet"
            value={originPlanet}
            onChange={(e) => setOriginPlanet(e.target.value as Planet)}
          >
            <FormControlLabel
              value={Planet.Earth}
              control={<Radio />}
              label="Earth"
            />
            <FormControlLabel
              value={Planet.Mars}
              control={<Radio />}
              label="Mars"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label={
            originPlanet === Planet.Earth ? "City, Country" : "4-digit Lot"
          }
          value={originLocation}
          onChange={(e) => setOriginLocation(e.target.value)}
          required
        />
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">Destination Planet</FormLabel>
          <RadioGroup
            row
            aria-label="destinationPlanet"
            name="destinationPlanet"
            value={destinationPlanet}
            onChange={(e) => setDestinationPlanet(e.target.value as Planet)}
          >
            <FormControlLabel
              value={Planet.Earth}
              control={<Radio />}
              label="Earth"
            />
            <FormControlLabel
              value={Planet.Mars}
              control={<Radio />}
              label="Mars"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label={
            destinationPlanet === Planet.Earth ? "City, Country" : "4-digit Lot"
          }
          value={destinationLocation}
          onChange={(e) => setDestinationLocation(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </Box>
  );
};

export default EditAddress;

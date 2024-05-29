import React, { useState } from "react";
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
import { Address } from "../interfaces/Address";
import { RegisterAddressProps } from "../interfaces/RegisterAddressProps";
import { Planet } from "../enums/Planet";

const RegisterAddress: React.FC<RegisterAddressProps> = ({ addAddress }) => {
  const [originPlanet, setOriginPlanet] = useState<Planet>(Planet.Earth);
  const [destinationPlanet, setDestinationPlanet] = useState<Planet>(
    Planet.Earth
  );
  const [originLocation, setOriginLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAddress: Address = {
      originPlanet,
      destinationLocation,
      originLocation,
      destinationPlanet,
      packageDescription,
      notes,
    };

    addAddress(newAddress);
    setOriginLocation("");
    setDestinationLocation("");
    setOriginLocation("");
    setPackageDescription("");
    setNotes("");
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastro de Endereço
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">Planeta de Origem</FormLabel>
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
              label="Terra"
            />
            <FormControlLabel
              value={Planet.Mars}
              control={<Radio />}
              label="Marte"
            />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">Planeta de Destino</FormLabel>
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
              label="Terra"
            />
            <FormControlLabel
              value={Planet.Mars}
              control={<Radio />}
              label="Marte"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Localização de Origem"
          value={originLocation}
          onChange={(e) => setOriginLocation(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Localização de Destino"
          value={destinationLocation}
          onChange={(e) => setDestinationLocation(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Descrição do Pacote"
          value={packageDescription}
          onChange={(e) => setPackageDescription(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>
    </Box>
  );
};

export default RegisterAddress;

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
  Grid,
} from "@mui/material";
import { Address } from "../interfaces/Address";
import { RegisterAddressProps } from "../interfaces/RegisterAddressProps";
import { Planet } from "../enums/Planet";

const RegisterAddress: React.FC<RegisterAddressProps> = ({ addAddress }) => {
  const [originPlanet, setOriginPlanet] = useState<Planet>(Planet.Earth);
  const [destinationPlanet, setDestinationPlanet] = useState<Planet>(
    Planet.Earth
  );
  const [originDescription, setOriginDescription] = useState("");
  const [destinationDescription, setDestinationDescription] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAddress: Address = {
      originPlanet,
      destinationPlanet,
      originLocation: originDescription,
      destinationLocation: destinationDescription,
      packageDescription,
      notes,
    };

    addAddress(newAddress);
    setOriginDescription("");
    setDestinationDescription("");
    setPackageDescription("");
    setNotes("");
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Delivery
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
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
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              margin="normal"
              label={
                originPlanet === Planet.Earth ? "City, Country" : "4-digit Lot"
              }
              value={originDescription}
              onChange={(e) => setOriginDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              margin="normal"
              label={
                destinationPlanet === Planet.Earth
                  ? "City, Country"
                  : "4-digit Lot"
              }
              value={destinationDescription}
              onChange={(e) => setDestinationDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              label="Package Description"
              value={packageDescription}
              onChange={(e) => setPackageDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              New
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegisterAddress;

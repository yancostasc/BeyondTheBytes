import React, { useEffect, useState } from "react";
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
  const [originDescription, setOriginDescription] = useState<string>("");
  const [destinationDescription, setDestinationDescription] =
    useState<string>("");
  const [packageDescription, setPackageDescription] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (address) {
      setOriginPlanet(address.originPlanet);
      setDestinationPlanet(address.destinationPlanet);
      setOriginDescription(address.originLocation || "");
      setDestinationDescription(address.destinationLocation || "");
      setPackageDescription(address.packageDescription || "");
      setNotes(address.notes || "");
    }
  }, [address]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      const updatedAddress: Address = {
        originPlanet: originPlanet,
        destinationPlanet: destinationPlanet,
        originLocation: originDescription,
        destinationLocation: destinationDescription,
        packageDescription: packageDescription,
        notes: notes,
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
        <Grid container spacing={2}>
          <Grid item xs={3}>
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
          <Grid item xs={9}>
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
          <Grid item xs={3}>
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
          <Grid item xs={9}>
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
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="flex-end"
            marginTop={2}
          >
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditAddress;

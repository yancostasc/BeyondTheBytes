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
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent, shouldNavigate: boolean) => {
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

    if (shouldNavigate) {
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
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
          <Typography color="text.primary">New Delivery</Typography>
        </Breadcrumbs>
      </Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Delivery
      </Typography>
      <form style={{ width: "100%" }}>
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
            gap={2}
            marginTop={4}
          >
            <Button variant="outlined" color="warning" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => handleSubmit(e, true)}
            >
              Save
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => handleSubmit(e, false)}
            >
              Save Another
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegisterAddress;

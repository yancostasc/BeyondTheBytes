import React, { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Delivery } from "../interfaces/Delivery";
import { RegisterDeliveryProps } from "../interfaces/RegisterDeliveryProps";
import { Planet } from "../enums/Planet";
import { countriesAndCapitals } from "../data/Countries";
import { v4 as uuidv4 } from "uuid";

const RegisterDelivery: React.FC<RegisterDeliveryProps> = ({ addDelivery }) => {
  const [, setDeliveryId] = useState("");
  const [originPlanet, setOriginPlanet] = useState<Planet>(Planet.Earth);
  const [destinationPlanet, setDestinationPlanet] = useState<Planet>(
    Planet.Earth
  );
  const [originDescription, setOriginDescription] = useState("");
  const [originLatitude, setOriginLatitude] = useState(0);
  const [originLongitude, setOriginLongitude] = useState(0);
  const [destinationDescription, setDestinationDescription] = useState("");
  const [destinationLatitude, setDestinationLatitude] = useState(0);
  const [destinationLongitude, setDestinationLongitude] = useState(0);
  const [packageDescription, setPackageDescription] = useState("");
  const [notes, setNotes] = useState("");

  const [emptyFieldsAlert, setEmptyFieldsAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setDeliveryId(uuidv4());

    const fetchRandomCoordinates = () => {
      const randomIndex = Math.floor(
        Math.random() * countriesAndCapitals.length
      );

      const randomCountry = countriesAndCapitals[randomIndex];
      if (randomCountry) {
        const { latitude, longitude } = randomCountry;
        setOriginLatitude(latitude);
        setOriginLongitude(longitude);
        setDestinationLatitude(latitude);
        setDestinationLongitude(longitude);
      }
    };

    if (originDescription.trim() !== "") {
      fetchRandomCoordinates();
    }
    if (destinationDescription.trim() !== "") {
      fetchRandomCoordinates();
    }
  }, [
    originDescription,
    destinationDescription,
    originPlanet,
    destinationPlanet,
  ]);

  const handleCloseAlert = () => {
    setEmptyFieldsAlert(false);
    setSuccessAlert(false);
  };

  const handleSubmit = (e: React.FormEvent, shouldNavigate: boolean) => {
    e.preventDefault();

    const newDeliveryId = uuidv4();

    if (
      originDescription.trim() === "" ||
      destinationDescription.trim() === "" ||
      packageDescription.trim() === ""
    ) {
      setEmptyFieldsAlert(true);
      return;
    }

    const newDelivery: Delivery = {
      deliveryId: newDeliveryId,
      originPlanet,
      destinationPlanet,
      originLocation: originDescription,
      destinationLocation: destinationDescription,
      packageDescription,
      notes,
      originLatitude,
      originLongitude,
      destinationLatitude,
      destinationLongitude,
    };

    addDelivery(newDelivery);
    setSuccessAlert(true);

    if (shouldNavigate) {
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleOriginPlanetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginPlanet(e.target.value as Planet);
    setOriginDescription("");
  };

  const handleDestinationPlanetChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestinationPlanet(e.target.value as Planet);
    setDestinationDescription("");
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
      <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e, true)}>
        <Snackbar
          open={emptyFieldsAlert}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
        >
          <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
            Please fill in all required fields.
          </Alert>
        </Snackbar>
        <Snackbar
          open={successAlert}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100" }}>
            Delivery added successfully.
          </Alert>
        </Snackbar>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControl component="fieldset" fullWidth margin="normal">
              <FormLabel component="legend">Origin Planet</FormLabel>
              <RadioGroup
                row
                aria-label="originPlanet"
                name="originPlanet"
                value={originPlanet}
                onChange={handleOriginPlanetChange}
              >
                <FormControlLabel
                  value={Planet.Earth}
                  control={
                    <Radio
                      sx={{
                        color: "#8A2BE2",
                        "&.Mui-checked": {
                          color: "#8A2BE2",
                        },
                      }}
                    />
                  }
                  label="Earth"
                />
                <FormControlLabel
                  value={Planet.Mars}
                  control={
                    <Radio
                      sx={{
                        color: "#8A2BE2",
                        "&.Mui-checked": {
                          color: "#8A2BE2",
                        },
                      }}
                    />
                  }
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
                originPlanet === Planet.Earth ? "City, Country" : "4-digit"
              }
              value={originDescription}
              onChange={(e) => setOriginDescription(e.target.value)}
              inputProps={{
                maxLength: originPlanet === Planet.Earth ? 100 : 4,
              }}
              required
              color="secondary"
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
                onChange={handleDestinationPlanetChange}
              >
                <FormControlLabel
                  value={Planet.Earth}
                  control={
                    <Radio
                      sx={{
                        color: "#8A2BE2",
                        "&.Mui-checked": {
                          color: "#8A2BE2",
                        },
                      }}
                    />
                  }
                  label="Earth"
                />
                <FormControlLabel
                  value={Planet.Mars}
                  control={
                    <Radio
                      sx={{
                        color: "#8A2BE2",
                        "&.Mui-checked": {
                          color: "#8A2BE2",
                        },
                      }}
                    />
                  }
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
              inputProps={{
                maxLength: destinationPlanet === Planet.Earth ? 100 : 4,
              }}
              required
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              label="Package Description"
              value={packageDescription}
              onChange={(e) => setPackageDescription(e.target.value)}
              inputProps={{ maxLength: 100 }}
              required
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              inputProps={{ maxLength: 100 }}
              color="secondary"
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
            <Button
              variant="outlined"
              sx={{
                color: "#CC1034",
                borderColor: "#CC1034",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#8A2BE2",
                "&:hover": {
                  backgroundColor: "#8A2BE2",
                },
                "&:focus": {
                  backgroundColor: "#8A2BE2",
                },
              }}
              onClick={(e) => handleSubmit(e, true)}
            >
              Save
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#8A2BE2",
                "&:hover": {
                  backgroundColor: "#8A2BE2",
                },
                "&:focus": {
                  backgroundColor: "#8A2BE2",
                },
              }}
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

export default RegisterDelivery;

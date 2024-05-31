import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link as MuiLink,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { Planet } from "../enums/Planet";
import { Delivery } from "../interfaces/Delivery";
import { EditDeliveryProps } from "../interfaces/EditDeliveryProps";

const EditDelivery: React.FC<EditDeliveryProps> = ({
  delivery,
  updateDelivery,
}) => {
  const { deliveryId = "" } = useParams<{ deliveryId?: string }>();
  const [originPlanet, setOriginPlanet] = useState<Planet>(Planet.Earth);
  const [destinationPlanet, setDestinationPlanet] = useState<Planet>(
    Planet.Earth
  );
  const [originDescription, setOriginDescription] = useState<string>("");
  const [destinationDescription, setDestinationDescription] =
    useState<string>("");
  const [packageDescription, setPackageDescription] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [originLatitude, setOriginLatitude] = useState<number>(0);
  const [originLongitude, setOriginLongitude] = useState<number>(0);
  const [destinationLatitude, setDestinationLatitude] = useState<number>(0);
  const [destinationLongitude, setDestinationLongitude] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (delivery) {
      setOriginPlanet(delivery.originPlanet);
      setDestinationPlanet(delivery.destinationPlanet);
      setOriginDescription(delivery.originLocation || "");
      setDestinationDescription(delivery.destinationLocation || "");
      setPackageDescription(delivery.packageDescription || "");
      setNotes(delivery.notes || "");
      setOriginLatitude(delivery.originLatitude || 0);
      setOriginLongitude(delivery.originLongitude || 0);
      setDestinationLatitude(delivery.destinationLatitude || 0);
      setDestinationLongitude(delivery.destinationLongitude || 0);
    }
  }, [delivery]);

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

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (delivery) {
      const updatedDelivery: Delivery = {
        deliveryId: deliveryId,
        originPlanet: originPlanet,
        destinationPlanet: destinationPlanet,
        originLocation: originDescription,
        destinationLocation: destinationDescription,
        packageDescription: packageDescription,
        notes: notes,
        originLatitude: originLatitude,
        originLongitude: originLongitude,
        destinationLatitude: destinationLatitude,
        destinationLongitude: destinationLongitude,
      };
      updateDelivery(updatedDelivery);
      navigate("/");
    }
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
          <Typography color="text.primary">Edit Delivery</Typography>
        </Breadcrumbs>
      </Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Delivery
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
                originPlanet === Planet.Earth ? "City, Country" : "4-digit Lot"
              }
              value={originDescription}
              onChange={(e) => setOriginDescription(e.target.value)}
              required
              color="secondary"
              inputProps={{
                maxLength: originPlanet === Planet.Earth ? 100 : 4,
              }}
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
              required
              color="secondary"
              inputProps={{
                maxLength: destinationPlanet === Planet.Earth ? 100 : 4,
              }}
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
              inputProps={{ maxLength: 100 }}
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
            marginTop={2}
          >
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
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditDelivery;

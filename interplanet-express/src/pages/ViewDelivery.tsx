import React from "react";
import {
  Typography,
  Box,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { ViewDeliveryProps } from "../interfaces/viewDeliveryProps";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const ViewDelivery: React.FC<ViewDeliveryProps> = ({ delivery }) => {
  if (!delivery) {
    return (
      <Typography variant="h6" gutterBottom>
        Delivery not found
      </Typography>
    );
  }

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
          <Typography color="text.primary">View Delivery</Typography>
        </Breadcrumbs>
      </Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Delivery Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h3">
            Origin Location:
          </Typography>
          <Typography>{delivery.originLocation}</Typography>
          <Typography variant="h6" component="h3">
            Destination Location:
          </Typography>
          <Typography>{delivery.destinationLocation}</Typography>
          <Typography variant="h6" component="h3">
            Package Description:
          </Typography>
          <Typography>{delivery.packageDescription}</Typography>
          <Typography variant="h6" component="h3">
            Notes:
          </Typography>
          <Typography>{delivery.notes}</Typography>
          <Typography variant="h6" component="h3">
            Origin Planet:
          </Typography>
          <Typography>{delivery.originPlanet}</Typography>
          <Typography variant="h6" component="h3">
            Destination Planet:
          </Typography>
          <Typography>{delivery.destinationPlanet}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewDelivery;

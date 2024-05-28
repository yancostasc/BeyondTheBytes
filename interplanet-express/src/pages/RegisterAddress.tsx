import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Address } from '../interfaces/Address';

interface RegisterAddressProps {
  addAddress: (newAddress: Address) => void;
}

const RegisterAddress: React.FC<RegisterAddressProps> = ({ addAddress }) => {
  const [planet, setPlanet] = useState<"Terra" | "Marte">("Terra");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({ planet, location });
    setLocation("");
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastro de Endereço
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Planeta</InputLabel>
          <Select
            value={planet}
            onChange={(e) => setPlanet(e.target.value as "Terra" | "Marte")}
          >
            <MenuItem value="Terra">Terra</MenuItem>
            <MenuItem value="Marte">Marte</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label={planet === "Terra" ? "Cidade, País" : "Lote de 4 dígitos"}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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

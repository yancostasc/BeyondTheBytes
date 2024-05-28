import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Address } from '../interfaces/Address';
import { useNavigate } from 'react-router-dom';

interface EditAddressProps {
  address: Address | null;
  updateAddress: (updatedAddress: Address) => void;
}

const EditAddress: React.FC<EditAddressProps> = ({ address, updateAddress }) => {
  const [planet, setPlanet] = useState<"Terra" | "Marte">("Terra");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (address) {
      setPlanet(address.planet as "Terra" | "Marte");
      setLocation(address.location);
    }
  }, [address]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      updateAddress({ planet, location });
      navigate('/');
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edição de Endereço
      </Typography>
      <form onSubmit={handleUpdate}>
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
          Atualizar
        </Button>
      </form>
    </Box>
  );
};

export default EditAddress;

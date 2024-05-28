import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Address } from '../interfaces/Address';
import { AddressListProps } from '../interfaces/AddressListProps';

const AddressList: React.FC<AddressListProps> = ({ addresses, setSelectedAddress }) => {
  const navigate = useNavigate();

  const handleEditClick = (address: Address) => {
    setSelectedAddress(address);
    navigate('/edit');
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Lista de Endereços
      </Typography>
      <List>
        {addresses.map((address, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={`Planeta: ${address.planet}`}
              secondary={`Localização: ${address.location}`}
            />
            <Button variant="contained" color="primary" onClick={() => handleEditClick(address)}>
              Editar
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AddressList;

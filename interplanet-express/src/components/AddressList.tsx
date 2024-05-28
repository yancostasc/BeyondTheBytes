import { List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { AddressListProps } from '../interfaces/AddressListProps';

const AddressList: React.FC<AddressListProps> = ({ addresses }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Lista de Endereços
      </Typography>
      <List>
        {addresses.map((address, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Planeta: ${address.planet}`}
              secondary={`Localização: ${address.location}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AddressList;

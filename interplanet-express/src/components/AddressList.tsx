import React from "react";
import { AddressListProps } from "../interfaces/AddressListProps";

const AddressList: React.FC<AddressListProps> = ({ addresses }) => {
  return (
    <div>
      <h2>Lista de Endereços</h2>
      <ul>
        {addresses.map((address, index) => (
          <li key={index}>
            <strong>Planeta:</strong> {address.planet},{" "}
            <strong>Localização:</strong> {address.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;

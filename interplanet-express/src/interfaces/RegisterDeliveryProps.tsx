import { Delivery } from "./Delivery";

export interface RegisterAddressProps {
  addAddress: (newAddress: Delivery) => void;
}

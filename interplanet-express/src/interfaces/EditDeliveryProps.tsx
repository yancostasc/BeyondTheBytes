import { Delivery } from "./Delivery";

export interface EditAddressProps {
  address: Delivery | null;
  updateAddress: (updatedAddress: Delivery) => void;
}

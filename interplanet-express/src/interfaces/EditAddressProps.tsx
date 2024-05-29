import { Address } from "./Address";

export interface EditAddressProps {
  address: Address | null;
  updateAddress: (updatedAddress: Address) => void;
}

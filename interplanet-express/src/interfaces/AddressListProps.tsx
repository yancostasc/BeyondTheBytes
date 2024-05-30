import { Address } from "./Address";

export interface AddressListProps {
  addresses: Address[];
  setSelectedAddress: (address: Address) => void;
  deleteAddress: (address: Address) => void;
  isNewAddressAdded: boolean;
}

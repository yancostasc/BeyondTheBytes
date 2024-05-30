import { Delivery } from "./Delivery";

export interface AddressListProps {
  addresses: Delivery[];
  setSelectedAddress: (address: Delivery) => void;
  deleteAddress: (address: Delivery) => void;
  isNewAddressAdded: boolean;
  isAddressEdited: boolean;
}

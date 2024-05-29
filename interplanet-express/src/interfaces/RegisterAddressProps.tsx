import { Address } from "./Address";

export interface RegisterAddressProps {
    addAddress: (newAddress: Address) => void;
}
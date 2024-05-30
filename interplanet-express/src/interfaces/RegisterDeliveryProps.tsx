import { Delivery } from "./Delivery";

export interface RegisterDeliveryProps {
  addDelivery: (newDelivery: Delivery) => void;
}

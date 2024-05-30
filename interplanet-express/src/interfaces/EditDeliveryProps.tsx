import { Delivery } from "./Delivery";

export interface EditDeliveryProps {
  Delivery: Delivery | null;
  updateDelivery: (updatedDelivery: Delivery) => void;
}

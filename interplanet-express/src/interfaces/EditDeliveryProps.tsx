import { Delivery } from "./Delivery";

export interface EditDeliveryProps {
  delivery: Delivery | null;
  updateDelivery: (updatedDelivery: Delivery) => void;
}

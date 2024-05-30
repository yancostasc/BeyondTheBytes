import { Delivery } from "./Delivery";

export interface DeliveryListProps {
  Deliveries: Delivery[];
  setSelectedDelivery: (Delivery: Delivery) => void;
  deleteDelivery: (Delivery: Delivery) => void;
  isNewDeliveryAdded: boolean;
  isDeliveryEdited: boolean;
}

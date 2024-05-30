import { Delivery } from "./Delivery";

export interface DeliveryListProps {
  Deliveryes: Delivery[];
  setSelectedDelivery: (Delivery: Delivery) => void;
  deleteDelivery: (Delivery: Delivery) => void;
  isNewDeliveryAdded: boolean;
  isDeliveryEdited: boolean;
}

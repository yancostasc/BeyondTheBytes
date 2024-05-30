import { Planet } from "../enums/Planet";

export interface Delivery {
  originPlanet: Planet;
  destinationPlanet: Planet;
  originLocation: string;
  destinationLocation: string;
  packageDescription: string;
  notes?: string;
}

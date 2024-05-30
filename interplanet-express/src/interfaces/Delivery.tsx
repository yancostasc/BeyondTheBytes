import { Planet } from "../enums/Planet";

export interface Delivery {
  originPlanet: Planet;
  destinationPlanet: Planet;
  originLocation: string;
  destinationLocation: string;
  originLatitude: number;
  originLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
  packageDescription: string;
  notes?: string;
}

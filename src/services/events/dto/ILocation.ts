import { ICoordinates } from './ICoordinates';

export interface ILocation {
  country: string;
  city?: string | null;
  address?: string | null;
  coords?: ICoordinates | null;
}

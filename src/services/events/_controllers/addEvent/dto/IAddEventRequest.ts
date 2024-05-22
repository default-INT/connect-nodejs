import { ILocation } from '../../../dto/ILocation';

export interface IAddEventRequest {
  title: string;
  description: string;
  eventType: string;
  finishDate: string;
  maxParticipants?: number;
  lang?: string;
  location: ILocation;
}

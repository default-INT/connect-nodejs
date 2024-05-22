import { ILocation } from './ILocation';

export interface IEventDto {
  id: number;
  title: string;
  description: string;
  eventType: string;
  finishDate: string;
  maxParticipants?: number | null;
  lang?: string | null;
  location: ILocation;
}

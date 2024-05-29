import { EventType } from 'shared/dto/EventType';
import { ILocation } from './ILocation';

export interface IEventDto {
  id: number;
  title: string;
  description: string;
  eventType: EventType;
  finishDate: string;
  maxParticipants?: number | null;
  lang?: string | null;
  location: ILocation;
}

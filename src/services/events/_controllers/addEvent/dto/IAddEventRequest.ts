import { EventType } from 'shared/dto/EventType';
import { ILocation } from '../../../dto/ILocation';

export interface IAddEventRequest {
  title: string;
  description: string;
  eventType: EventType;
  finishDate: string;
  maxParticipants?: number;
  lang?: string;
  location: ILocation;
}

import { EventType } from 'shared/dto/EventType';
import { ICoordinates } from 'services/events/dto/ICoordinates';

export interface IAddEventRequest {
  title: string;
  eventType: EventType;
  coords: ICoordinates;
  eventDate: string;
  langId?: number;
  maxParticipants?: number;
  description?: string;
}

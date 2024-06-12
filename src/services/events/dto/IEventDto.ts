import { EventType } from 'shared/dto/EventType';
import { ICoordinates } from 'services/events/dto/ICoordinates';

export interface IEventDto {
  id: number;
  title: string;
  eventType: EventType;
  coords: ICoordinates | null;
  eventDate: string;
  lang?: string | null;
  maxParticipants?: number | null;
  description?: string | null;
}

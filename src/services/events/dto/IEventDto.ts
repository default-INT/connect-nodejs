import { EventType } from 'shared/dto/EventType';
import { ICoordinates } from 'services/events/dto/ICoordinates';
import { ILanguageDto } from 'shared/dto/ILanguageDto';

export interface IEventDto {
  id: number;
  title: string;
  eventType: EventType;
  coords: ICoordinates | null;
  eventDate: string;
  lang?: ILanguageDto | null;
  maxParticipants?: number | null;
  description?: string | null;
}

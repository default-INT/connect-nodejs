import { EventType } from 'shared/dto/EventType';
import { ICoordinates } from 'services/events/dto/ICoordinates';
import { ILanguageDto } from 'shared/dto/ILanguageDto';
import { IUserDto } from 'shared/dto/IUserDto';

export interface IEventDto {
  id: number;
  title: string;
  eventType: EventType;
  coords: ICoordinates | null;
  eventDate: string;
  lang?: ILanguageDto | null;
  maxParticipants?: number | null;
  description?: string | null;
  ownerId: number;
  owner: IUserDto | null;
}

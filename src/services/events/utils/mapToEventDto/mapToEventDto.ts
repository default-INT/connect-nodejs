import { Event } from 'storage/entities/Event';
import { fromPoint } from 'shared/utils/converter/fromPoint';
import { mapToLanguageDto } from 'shared/dto/mappers/mapToLanguageDto';
import { mapToUserDto } from 'shared/dto/mappers/mapToUserDto';
import { IEventDto } from '../../dto/IEventDto';

export const mapToEventDto = (event: Event): IEventDto => {
  const { lang } = event;

  return ({
    id: event.id,
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    maxParticipants: event.maxParticipants,
    lang: lang ? mapToLanguageDto(lang) : null,
    eventDate: event.eventDate.toISOString(),
    coords: fromPoint(event.coords),
    ownerId: event.ownerId,
    owner: event.owner ? mapToUserDto(event.owner) : null,
  });
};

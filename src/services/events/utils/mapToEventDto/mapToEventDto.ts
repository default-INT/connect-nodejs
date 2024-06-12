import { Event } from 'storage/entities/Event';
import { fromPoint } from 'shared/utils/converter/fromPoint';
import { IEventDto } from '../../dto/IEventDto';

export const mapToEventDto = (event: Event): IEventDto => ({
    id: event.id,
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    maxParticipants: event.maxParticipants,
    eventDate: event.eventDate.toISOString(),
    coords: fromPoint(event.coords),
  });

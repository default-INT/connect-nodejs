import { Event } from 'storage/entities/Event';
import { ILocation } from 'services/events/dto/ILocation';
import { fromPoint } from 'shared/utils/converter/fromPoint';
import { IEventDto } from '../../dto/IEventDto';

export const mapToEventDto = (event: Event): IEventDto => {
  const location: ILocation = {
    country: event.location?.country || '',
    city: event.location?.city,
    address: event.location?.address,
    coords: event.location?.coords ? fromPoint(event.location?.coords) : null,
  };

  return ({
    id: event.id,
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    maxParticipants: event.maxParticipants,
    finishDate: event.finishDate as any,
    location,
  });
};

import { Location } from 'storage/entities/Location';
import { Event } from 'storage/entities/Event';
import { mapToEventDto } from 'services/events/utils/mapToEventDto';

export const mapToCoordsEventList = (locationList: Location[]) => locationList.map(loc => {
    const event = loc.event as Event;
    event.location = loc;

    return mapToEventDto(event);
  });

import { ICoordinates } from 'services/events/dto/ICoordinates';

export const fromPoint = (point: string): ICoordinates | null => {
  const matched = point.match(/\(([^ ]+) ([^ ]+)\)/);
  if (!matched) return null;

  return ({
    latitude: parseFloat(matched[1]),
    longitude: parseFloat(matched[2]),
  });
};

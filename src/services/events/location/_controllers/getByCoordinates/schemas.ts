import { queryCoordsSchema } from 'shared/schemas/coordsSchema';
import { apiNumber } from 'shared/schemas/apiNumber';

export const getByCoordinatesSchema = queryCoordsSchema.extend({
  radius: apiNumber,
});

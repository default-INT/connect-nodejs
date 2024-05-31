import { RequestHandler } from 'express';
import { IEventDto } from 'services/events/dto/IEventDto';
import { dataSource } from 'storage';
import { Location } from 'storage/entities/Location';
import { toPoint } from 'shared/utils/converter/toPoint';
import { ForbiddenError } from 'shared/errors/403/ForbiddenError';
import { mapToCoordsEventList } from './utils/mapToCoordsEventList';
import { IGetByCoordsRequest } from './dto/IGetByCoordsRequest';

type TGetByCoordinates = RequestHandler<{}, IEventDto[] | string, {}, IGetByCoordsRequest>;

/**
 * @swagger
 * /api/events/location/getByCoordinates:
 *   get:
 *     summary: Get live events by coordinates and radius
 *     tags: [events]
 *     parameters:
 *         - in: query
 *           name: latitude
 *           schema:
 *             type: number
 *         - in: query
 *           name: longitude
 *           schema:
 *             type: number
 *         - in: query
 *           name: radius
 *           schema:
 *             type: number
 *     responses:
 *       200:
 *         description: Events array.
 *         content:
 *           application/json::
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/IEventDto'
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Some server error
 *
 */
export const getByCoordinates: TGetByCoordinates = async (req, res) => {
  const { currentUser } = req;
  if (!currentUser) throw new ForbiddenError();
  const { latitude, longitude, radius } = req.query;
  const point = toPoint(latitude, longitude);

  // NOTE: for optimistic query, check file ./optimistic-search.sql
  // also in future make sens use local user time
  const locationResult = await dataSource.getRepository(Location)
    .createQueryBuilder('loc')
    .innerJoinAndSelect('loc.event', 'e')
    .where('e.finishDate > NOW()')
    .andWhere('(ST_Distance_Sphere(loc.coords,  ST_GeomFromText(:point, 4326))) <= :radius', {
      radius, point,
    })
    .getMany();

  return res.status(200).json(mapToCoordsEventList(locationResult));
};

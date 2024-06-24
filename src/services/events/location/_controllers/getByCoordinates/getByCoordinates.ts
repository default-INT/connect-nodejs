import { RequestHandler } from 'express';
import { IEventDto } from 'services/events/dto/IEventDto';
import { dataSource } from 'storage';
import { Event } from 'storage/entities/Event';
import { toPoint } from 'shared/utils/converter/toPoint';
import { ForbiddenError } from 'shared/errors/403/ForbiddenError';
import { mapToEventDto } from 'services/events/utils/mapToEventDto';
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

  const events = await dataSource.getRepository(Event)
    .createQueryBuilder('event')
    .leftJoinAndSelect('event.lang', 'lang')
    .leftJoin('event.owner', 'owner')
    .addSelect([
      'owner.id',
      'owner.firstName',
      'owner.lastName',
      'owner.friendlyName',
      'owner.email',
      'owner.avatar',
    ])
    .where('event.eventDate > NOW()')
    .andWhere('(ST_Distance_Sphere(event.coords,  ST_GeomFromText(:point, 4326))) <= :radius', {
      radius, point,
    })
    .getMany();

  const formatedEvents = events.map(mapToEventDto);

  return res.status(200).json(formatedEvents);
};

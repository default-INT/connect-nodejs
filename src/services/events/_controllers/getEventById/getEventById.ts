import { RequestHandler } from 'express';
import { dataSource } from 'storage';
import { Event } from 'storage/entities/Event';
import { mapToEventDto } from 'services/events/utils/mapToEventDto';
import { ForbiddenError } from 'shared/errors/403/ForbiddenError';
import { NotFoundResource } from 'shared/errors/404/NotFoundResource';
import { IEventDto } from '../../dto/IEventDto';

type TGetEventByIdResponse = RequestHandler<{}, IEventDto | string, {}, { id: number }>;

/**
 * @swagger
 * /api/events/getEventById:
 *   get:
 *     summary: Get event by Id
 *     tags: [events]
 *     parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: integer
 *     responses:
 *       200:
 *         description: Event returned successes.
 *         content:
 *           application/json::
 *             schema:
 *               $ref: '#/definitions/IEventDto'
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Some server error
 */
export const getEventById:TGetEventByIdResponse = async (req, res) => {
  const { currentUser, query: { id } } = req;
  if (!currentUser) throw new ForbiddenError();

  const eventRepo = dataSource.getRepository(Event);

  const event = await eventRepo.findOne({
    where: { id },
  });

  if (!event) throw new NotFoundResource('Event by id not found');

  return res.status(200).json(mapToEventDto(event));
};

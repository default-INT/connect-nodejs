import { RequestHandler } from 'express';
import { Event } from 'storage/entities/Event';
import { dataSource } from 'storage';
import { ForbiddenError } from 'shared/errors/403/ForbiddenError';
import { NotFoundResource } from 'shared/errors/404/NotFoundResource';

type TDeleteEventByIdRequest = RequestHandler<{}, {}, {}, { id: number }>;

/**
 * @swagger
 * /api/events/deleteEventById:
 *   post:
 *     summary: Delete event by Id
 *     tags: [events]
 *     parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: integer
 *     responses:
 *       200:
 *         description: The created event.
 *         content:
 *           text/plain:
 *             schema:
 *               type: number
 *               example: 1
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Some server error
 *
 */
export const deleteEventById: TDeleteEventByIdRequest = async (req, res) => {
  const { currentUser, query: { id } } = req;
  if (!currentUser) throw new ForbiddenError();
  const { id: ownerId } = currentUser;
  const eventRepository = dataSource.getRepository(Event);

  const existEvent = await eventRepository.findOne({
    where: { id },
  });

  if (existEvent?.ownerId !== ownerId) throw new ForbiddenError();
  if (!existEvent) throw new NotFoundResource(`Not found event with id=${id}`);

  await eventRepository.remove(existEvent);

  return res.sendStatus(200);
};

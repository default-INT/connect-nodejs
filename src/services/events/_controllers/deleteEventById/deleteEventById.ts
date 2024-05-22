import { RequestHandler } from 'express';
import { Event } from 'storage/entities/Event';
import { dataSource } from 'storage';

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
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Some server error
 *
 */
export const deleteEventById: TDeleteEventByIdRequest = async (req, res) => {
  const { currentUser, query: { id } } = req;
  if (!currentUser) return res.status(400).json('Current user does not exist');
  const { id: ownerId } = currentUser;
  const eventRepository = dataSource.getRepository(Event);

  const existEvent = await eventRepository.findOne({
    where: { id },
    relations: {
      location: true,
    },
  });

  if (existEvent?.ownerId !== ownerId) return res.sendStatus(403).send('Forbidden');
  if (!existEvent) return res.sendStatus(404).send('No exist');

  await eventRepository.remove(existEvent);

  return res.sendStatus(200);
};

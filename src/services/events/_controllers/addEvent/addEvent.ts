import { RequestHandler } from 'express';
import { dataSource } from 'storage';
import { toPoint } from 'shared/utils/converter/toPoint';
import { Event } from 'storage/entities/Event';
import { UnauthorizedError } from 'shared/errors/401/UnauthorizedError';
import { IAddEventRequest } from './dto/IAddEventRequest';

type TAddEventRequest = RequestHandler<{}, number | string, IAddEventRequest>;

/**
 * @swagger
 * /api/events/addEvent:
 *   post:
 *     summary: Add new Event
 *     tags: [events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/IAddEventRequest'
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
 *       500:
 *         description: Some server error
 *
 */
export const addEvent: TAddEventRequest = async (req, res) => {
  const { currentUser, body: rawEvent } = req;
  if (!currentUser) throw new UnauthorizedError();

  const ownerId = currentUser.id;
  const { coords } = rawEvent;
  const eventRepo = dataSource.getRepository(Event);

  const eventByRepo = eventRepo.create({
    ...rawEvent,
    coords: toPoint(coords.latitude, coords.longitude),
    eventDate: new Date(rawEvent.eventDate),
    ownerId,
  });

  const event = await eventRepo.save(eventByRepo);

  return res.status(200).json(event.id);
};

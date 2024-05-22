import { RequestHandler } from 'express';
import { dataSource } from 'storage';
import { toPoint } from 'shared/utils/converter/toPoint';
import { Location } from 'storage/entities/Location';
import { Event } from 'storage/entities/Event';
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
 *             $ref: '#/components/schemas/IAddEventRequest'
 *     responses:
 *       200:
 *         description: The created event.
 *         content:
 *           text/plain:
 *             schema:
 *               type: number
 *               example: 1
 *       403:
 *         description: Validation error
 *       500:
 *         description: Some server error
 *
 */
export const addEvent: TAddEventRequest = async (req, res) => {
  const { currentUser, body: rawEvent } = req;
  if (!currentUser) return res.status(400).json('Current user does not exist');

  const ownerId = currentUser.id;
  const { coords } = rawEvent.location || {};
  const locationRepo = dataSource.getRepository(Location);
  const eventRepo = dataSource.getRepository(Event);

  const rawLocation = {
    ...rawEvent.location,
    coords: coords ? toPoint(coords.latitude, coords.longitude) : null,
  };

  const locationByRepo = locationRepo.create(rawLocation);
  const location = await locationRepo.save(locationByRepo);

  const eventByRepo = eventRepo.create({
    ...rawEvent,
    finishDate: new Date(rawEvent.finishDate),
    ownerId,
    location,
  });

  const event = await eventRepo.save(eventByRepo);

  return res.sendStatus(200).send(event.id);
};

import { RequestHandler } from 'express';
import { dataSource } from 'storage';
import { User } from 'storage/entities/User';
import { IUserDto } from './dto/IUserDto';
import { mapToUserDto } from './utils/mapToUserDto';

type TGetCurrentUserMethod = RequestHandler<{}, IUserDto | string>;

/**
 * @swagger
 * /api/auth/accounts/getCurrentUser:
 *   get:
 *     summary: Get user data
 *     tags: [accounts]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/IUserDto'
 *       403:
 *         description: Validation error
 *       500:
 *         description: Some server error
 */
export const getCurrentUser: TGetCurrentUserMethod = async (req, res) => {
  const { currentUser } = req;
  if (!currentUser) return res.status(400).json('Current user does not exist');
  const userRepository = dataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: currentUser.id,
  });

  if (!user) return res.status(403).json('Current user does not exist');

  return res.status(200).json(mapToUserDto(user));
};

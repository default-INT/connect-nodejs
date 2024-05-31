import { RequestHandler } from 'express';
import { dataSource } from 'storage';
import { User } from 'storage/entities/User';
import { NotFoundResource } from 'shared/errors/404/NotFoundResource';
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
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
export const getCurrentUser: TGetCurrentUserMethod = async (req, res) => {
  const { currentUser } = req;
  if (!currentUser) throw new NotFoundResource('User');
  const userRepository = dataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: currentUser.id,
  });

  if (!user) throw new NotFoundResource('User');

  return res.status(200).json(mapToUserDto(user));
};

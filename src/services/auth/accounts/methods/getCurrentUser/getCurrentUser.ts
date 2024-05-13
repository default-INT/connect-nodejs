import { RequestHandler } from 'express';
import { IUserDto } from 'services/auth/dto/res/IUserDto';
import { IRequest } from 'shared/types/http';
import { dataSource } from 'storage';
import { User } from 'storage/entities/User';
import { mapToUserDto } from 'services/auth/utils/mapToUserDto';

type TGetCurrentUserMethod = RequestHandler<{}, IUserDto | string>;

/**
 * @swagger
 * /api/auth/accounts/getCurrentUser:
 *   get:
 *     summary: Get user data
 *     tags: [accounts]
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IUserDto'
 *       403:
 *         description: Validation error
 *       500:
 *         description: Some server error
 */
export const getCurrentUser: TGetCurrentUserMethod = async (req: IRequest, res) => {
  const { currentUser } = req;
  if (!currentUser) return res.status(400).json('Current user does not exist');
  const userRepository = dataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: currentUser.id,
  });

  if (!user) return res.status(403).json('Current user does not exist');

  return res.status(200).json(mapToUserDto(user));
};

import { RequestHandler } from 'express';
import { IUserDto } from 'services/auth/dto.types';
import { IRequest } from 'shared/types/http';
import { dataSource } from 'storage';
import { User } from 'storage/entities/User';
import { mapToUserDto } from 'services/auth/utils/mapToUserDto';

type TGetCurrentUserMethod = RequestHandler<{}, IUserDto | string>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCurrentUser: TGetCurrentUserMethod = async (req: IRequest, res) => {
  const { currentUser } = req;
  if (!currentUser) return res.status(400).json('Current user does not exist');
  const userRepository = dataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: currentUser.id,
  });

  if (!user) return res.status(400).json('Current user does not exist');

  return res.status(200).json(mapToUserDto(user));
};

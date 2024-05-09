import { User } from 'storage/entities/User';
import { IUserDto } from 'services/auth/dto.types';

export const mapToUserDto = (user: User): IUserDto => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    friendlyName: user.friendlyName,
    avatar: user.avatar,
  });

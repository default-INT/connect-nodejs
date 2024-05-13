export interface IUserDto {
  id: number;
  email: string;
  friendlyName: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
}

export interface IUserDto {
  id: number;
  email: string;
  friendlyName: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
}

export interface ITokensDto {
  accessToken: string;
  refreshToken: string;
  accessExpiredAt: string;
  refreshExpiredAt: string;
}

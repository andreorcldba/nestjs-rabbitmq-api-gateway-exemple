import { Users } from 'src/modules/users/entities/users.entity';

export interface IAccessToken {
  accessToken: string;
}

export interface IRefreshToken {
  refreshToken: string;
}

export interface IAccessAndRefreshToken {
  accessToken: string;
  refreshToken: string;
  user: Users;
}

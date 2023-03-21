import { Request } from 'express';
import { Users } from 'src/modules/users/entities/users.entity';

export interface IRequestUser extends Request {
  user: Users;
}

export interface ILoginAuth {
  email: string;
  password: string;
}

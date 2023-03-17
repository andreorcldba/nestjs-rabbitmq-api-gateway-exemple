import { Request } from 'express';
import { Users } from 'src/modules/users/entities/users.entity';

export interface RequestWithUser extends Request {
  user: Users;
}

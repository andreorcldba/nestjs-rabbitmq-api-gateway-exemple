import { DefaultBaseEntity } from 'src/typeorm-base/entities/base.entity';

export class Users extends DefaultBaseEntity {
  public name: string;

  public email: string;

  public password: string;

  public status: boolean;
}

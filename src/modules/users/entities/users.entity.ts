import { DefaultBaseEntity } from 'src/modules/base/entities/base.entity';

export class Users extends DefaultBaseEntity {
  public name: string;

  public email: string;

  public password: string;

  public remember_token: string;

  public status: boolean;
}

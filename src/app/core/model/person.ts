import { EntityObject } from './contracts/entity-object';

export class Person extends EntityObject {
  public firstName: string;
  public lastName: string;
  public email: string;
  public picture: string;
  public phoneNumber: string;
}

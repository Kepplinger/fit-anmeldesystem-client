import { EntityObject } from './contracts/entity-object';

export class Adress extends EntityObject {
  public city: string;
  public postalCode: string;
  public street: string;
  public number: string;
}

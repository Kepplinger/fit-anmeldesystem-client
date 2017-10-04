import { EntityObject } from './entity-object';

export class Adress extends EntityObject {
  public city: string;
  public postalCode: string;
  public street: string;
  public number: string;
}

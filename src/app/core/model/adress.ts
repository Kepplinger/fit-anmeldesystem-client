import { EntityObject } from './base-entity/entity-object';

export class Address extends EntityObject {
  public city: string;
  public postalCode: string;
  public street: string;
  public number: string;
}

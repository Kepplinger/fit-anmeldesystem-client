import { EntityObject } from './base-entity/entity-object';
import { Person } from './person';

export class Contact extends EntityObject {
  public person: Person;
}

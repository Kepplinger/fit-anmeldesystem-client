import { EntityObject } from './contracts/entity-object';
import { Person } from './person';

export class Contact extends EntityObject {
  public person: Person;
}

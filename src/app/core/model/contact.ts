import { Person } from './person';

export class Contact {
  public id: number;
  public person: Person;
  public timestamp: string;

  public constructor(person?: Person,
                     id?: number) {
    this.person = person;
    this.id = id;
  }
}

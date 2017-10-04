import { EntityObject } from './contracts/entity-object';
import { Adress } from './adress';
import { Contact } from './contact';

export class Company extends EntityObject {
  public name: string;
  public shortDescription: string;
  public address: Adress;
  public contact: Contact;
  public phoneNumber: string;
  public email: string;
  public homepage: string;
  public companySign: string;
  public subjectAreas: string;
}

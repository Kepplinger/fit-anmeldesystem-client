import { Address } from './adress';
import { Contact } from './contact';

export class Company {
  public id: number;
  public name: string;
  public shortDescription: string;
  public address: Address;
  public contact: Contact;
  public phoneNumber: string;
  public email: string;
  public homepage: string;
  public companySign: string;
  public subjectAreas: string;

  public constructor(name?: string,
                     shortDescription?: string,
                     address?: Address,
                     contact?: Contact,
                     phoneNumber?: string,
                     email?: string,
                     homepage?: string,
                     companySign?: string,
                     subjectAreas?: string,
                     id?: number) {
    this.id = id;
    this.name = name;
    this.shortDescription = shortDescription;
    this.address = address;
    this.contact = contact;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.homepage = homepage;
    this.companySign = companySign;
    this.subjectAreas = subjectAreas;
  }
}

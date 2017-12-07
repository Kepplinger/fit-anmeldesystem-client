import { Address } from './adress';
import { Contact } from './contact';

export class Company {
  public id: number;
  public timestamp: string;

  public name: string;
  public branch: string;
  public address: Address;
  public contact: Contact;
  public phone: string;
  public email: string;
  public homepage: string;
  public logo: string;
  public subjectAreas: string;
  public establishmentCountInt?: number;
  public establishmentsInt?: string[];
  public establishmentCountAut?: number;
  public establishmentsAut?: string[];

  public constructor(name?: string,
                     branch?: string,
                     address?: Address,
                     contact?: Contact,
                     phone?: string,
                     email?: string,
                     homepage?: string,
                     logo?: string,
                     subjectAreas?: string,
                     establishmentCountInt?: number,
                     establishmentsInt?: string[],
                     establishmentCountAut?: number,
                     establishmentsAut?: string[],
                     id?: number) {
    this.id = id;
    this.name = name;
    this.branch = branch;
    this.address = address;
    this.contact = contact;
    this.phone = phone;
    this.email = email;
    this.homepage = homepage;
    this.logo = logo;
    this.subjectAreas = subjectAreas;
    this.establishmentCountInt = establishmentCountInt;
    this.establishmentsInt = establishmentsInt;
    this.establishmentCountAut = establishmentCountAut;
    this.establishmentsAut = establishmentsAut;
  }
}

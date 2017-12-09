import { Address } from './adress';
import { Contact } from './contact';
import { Branch } from './branch';

export class Company {
  public id: number;
  public timestamp: string;

  public name: string;
  public branch: string;
  public address: Address;
  public contact: Contact;
  public desiredBranches: Branch[];
  public phone: string;
  public email: string;
  public homepage: string;
  public logo: string;
  public establishmentCountInt?: number;
  public establishmentsInt?: string[];
  public establishmentCountAut?: number;
  public establishmentsAut?: string[];

  public constructor(name?: string,
                     branch?: string,
                     address?: Address,
                     contact?: Contact,
                     desiredBranches?: Branch[],
                     phone?: string,
                     email?: string,
                     homepage?: string,
                     logo?: string,
                     establishmentCountInt?: number,
                     establishmentsInt?: string[],
                     establishmentCountAut?: number,
                     establishmentsAut?: string[],
                     id?: number) {
    this.id = id;
    this.name = name;
    this.branch = branch;
    this.desiredBranches = desiredBranches;
    this.address = address;
    this.contact = contact;
    this.phone = phone;
    this.email = email;
    this.homepage = homepage;
    this.logo = logo;
    this.establishmentCountInt = establishmentCountInt;
    this.establishmentsInt = establishmentsInt;
    this.establishmentCountAut = establishmentCountAut;
    this.establishmentsAut = establishmentsAut;
  }
}

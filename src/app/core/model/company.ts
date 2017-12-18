import { Address } from './address';
import { Contact } from './contact';
import { Branch } from './branch';

export class Company {
  public id: number;
  public timestamp: string;

  public address: Address;
  public contact: Contact;
  public name: string;
  public branch: string;
  public phoneNumber: string;
  public email: string;
  public homepage: string;
  public logoUrl: string;
  public establishmentsCountInt?: number;
  public establishmentsInt?: string[];
  public establishmentsCountAut?: number;
  public establishmentsAut?: string[];

  public constructor(address?: Address,
                     contact?: Contact,
                     name?: string,
                     branch?: string,
                     phoneNumber?: string,
                     email?: string,
                     homepage?: string,
                     logoUrl?: string,
                     establishmentsCountInt?: number,
                     establishmentsInt?: string[],
                     establishmentsCountAut?: number,
                     establishmentsAut?: string[],
                     id?: number) {
    this.id = id;
    this.name = name;
    this.branch = branch;
    this.address = address;
    this.contact = contact;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.homepage = homepage;
    this.logoUrl = logoUrl;
    this.establishmentsCountInt = establishmentsCountInt;
    this.establishmentsInt = establishmentsInt;
    this.establishmentsCountAut = establishmentsCountAut;
    this.establishmentsAut = establishmentsAut;
  }
}

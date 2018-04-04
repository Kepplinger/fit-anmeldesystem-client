import { Address } from './address';
import { Contact } from './contact';

export class Company {
  public id: number;
  public timestamp: string;

  public address: Address;
  public contact: Contact;

  public name: string;
  public isPending: boolean;

  public constructor(address?: Address,
                     contact?: Contact,
                     name?: string,
                     isPending?: boolean,
                     id?: number,
                     timestamp?: string) {
    this.id = id;
    this.timestamp = timestamp;
    this.address = address;
    this.contact = contact;
    this.name = name;
    this.isPending = isPending;

    if (this.address == null) {
      this.address = new Address();
    }

    if (this.contact == null) {
      this.contact = new Contact();
    }
  }
}

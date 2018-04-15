import { Address } from './address';
import { Contact } from './contact';

export class Company {
  public id: number;
  public timestamp: string;

  public address: Address;
  public contact: Contact;

  public tags: string[];

  public name: string;
  public isPending: boolean;

  public constructor(address?: Address,
                     contact?: Contact,
                     name?: string,
                     isPending?: boolean,
                     tags?: string[],
                     id?: number,
                     timestamp?: string) {
    this.id = id;
    this.timestamp = timestamp;
    this.address = address;
    this.contact = contact;
    this.name = name;
    this.tags = tags;
    this.isPending = isPending;

    if (this.address == null) {
      this.address = new Address();
    }

    if (this.contact == null) {
      this.contact = new Contact();
    }

    if (this.tags == null) {
      this.tags = [];
    }
  }
}

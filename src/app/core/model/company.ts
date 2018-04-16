import { Address } from './address';
import { Contact } from './contact';
import { Tag } from './tag';

export class Company {
  public id: number;
  public timestamp: string;

  public address: Address;
  public contact: Contact;

  public name: string;
  public isPending: boolean;

  public tags: Tag[];

  public memberPaymentAmount: number;
  public memberSince: number;
  public memberStatus: number;

  public constructor(address?: Address,
                     contact?: Contact,
                     name?: string,
                     isPending?: boolean,
                     tags?: Tag[],
                     memberPaymentAmount?: number,
                     memberSince?: number,
                     memberStatus?: number,
                     id?: number,
                     timestamp?: string) {
    this.id = id;
    this.timestamp = timestamp;
    this.address = address;
    this.contact = contact;
    this.name = name;
    this.tags = tags;
    this.isPending = isPending;
    this.memberPaymentAmount = memberPaymentAmount;
    this.memberSince = memberSince;
    this.memberStatus = memberStatus;

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

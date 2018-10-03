import { Address } from './address';
import { Contact } from './contact';
import { CompanyTag } from './company-tag';
import { CompanyBranch } from './company-branch';
import { IsAccepted } from './enums/is-accepted';
import { MemberStatus } from './member-status';

export class Company {
  public id: number;
  public timestamp: string;

  public address: Address;
  public contact: Contact;

  public name: string;
  public isAccepted: IsAccepted;

  public tags: CompanyTag[];
  public branches: CompanyBranch[];

  public memberPaymentAmount: number;
  public memberStatus: MemberStatus;

  public constructor(address?: Address,
                     contact?: Contact,
                     name?: string,
                     branches?: CompanyBranch[],
                     isAccepted?: IsAccepted,
                     tags?: CompanyTag[],
                     memberPaymentAmount?: number,
                     memberStatus?: MemberStatus,
                     id?: number,
                     timestamp?: string) {
    this.id = id;
    this.timestamp = timestamp;
    this.address = address;
    this.contact = contact;
    this.branches = branches;
    this.name = name;
    this.tags = tags;
    this.isAccepted = isAccepted;
    this.memberPaymentAmount = memberPaymentAmount;
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

    if (this.branches == null) {
      this.branches = [];
    }
  }
}

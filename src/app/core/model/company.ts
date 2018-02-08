import { Address } from './address';
import { Contact } from './contact';
import { FolderInfo } from './folder-info';

export class Company {
  public id: number;
  public timestamp: string;

  public address: Address;
  public contact: Contact;
  public fitInfo: FolderInfo;

  public name: string;
  public isPending: boolean;

  public constructor(address?: Address,
                     contact?: Contact,
                     fitInfo?: FolderInfo,
                     name?: string,
                     isPending?: boolean,
                     id?: number,
                     timestamp?: string) {
    this.id = id;
    this.timestamp = timestamp;
    this.address = address;
    this.contact = contact;
    this.fitInfo = fitInfo;
    this.name = name;
    this.isPending = isPending;
  }
}

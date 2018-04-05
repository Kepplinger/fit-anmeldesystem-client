import { Resource } from './resource';

export class ResourceBooking {
  public id: number;
  public timestamp: string;

  public resource: Resource;
  public amount: number;

  public constructor(resource?: Resource,
                     amount?: number,
                     id?: number) {
    this.id = id;
    this.resource = resource;
    this.amount = amount;
  }
}

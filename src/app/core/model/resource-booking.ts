import { Resource } from './resource';
import { Booking } from './booking';

export class ResourceBooking {
  public id: number;
  public timestamp: string;

  public resource: Resource;
  public booking: Booking;
  public amount: number;

  public constructor(resource?: Resource,
                     booking?: Booking,
                     amount?: number,
                     id?: number) {
    this.id = id;
    this.resource = resource;
    this.booking = booking;
    this.amount = amount;
  }
}

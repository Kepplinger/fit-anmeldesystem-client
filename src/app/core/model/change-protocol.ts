import { Booking } from './booking';
import { Moment } from 'moment';

export class ChangeProtocol {
  public id: number;
  public timestamp: string;

  public booking: Booking;
  public table: string;
  public column: string;
  public creationDate: Moment;
  public oldValue: any;
  public newValue: any;

  public constructor(booking?: Booking,
                     table?: string,
                     column?: string,
                     creationDate?: Moment,
                     oldValue?: any,
                     newValue?: any,
                     id?: number) {
    this.id = id;
    this.booking = booking;
    this.table = table;
    this.column = column;
    this.creationDate = creationDate;
    this.oldValue = oldValue;
    this.newValue = newValue;
  }
}

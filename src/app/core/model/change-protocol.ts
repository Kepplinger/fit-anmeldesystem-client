import { Booking } from './booking';
import { Moment } from 'moment';

export class ChangeProtocol {
  public id: number;
  public timestamp: string;

  public booking: Booking;
  public tableName: string;
  public columName: string;
  public creationDate: Moment;
  public oldValue: any;
  public newValue: any;

  public constructor(booking?: Booking,
                     tableName?: string,
                     columName?: string,
                     creationDate?: Moment,
                     oldValue?: any,
                     newValue?: any,
                     id?: number) {
    this.id = id;
    this.booking = booking;
    this.tableName = tableName;
    this.columName = columName;
    this.creationDate = creationDate;
    this.oldValue = oldValue;
    this.newValue = newValue;
  }
}

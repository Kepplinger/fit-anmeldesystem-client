import { Moment } from 'moment';
import * as moment from 'moment';

export class Event {
  public id: number;
  public timestamp: string;

  public date: Moment = moment();
  public registrationStart: Moment = moment();
  public registrationEnd: Moment = moment();
  public isLocked: boolean;

  public constructor(date?: Moment,
                     registrationStart?: Moment,
                     registrationEnd?: Moment,
                     isLocked?: boolean,
                     id?: number) {
    this.id = id;
    this.date = date;
    this.registrationStart = registrationStart;
    this.registrationEnd = registrationEnd;
    this.isLocked = isLocked;
  }
}

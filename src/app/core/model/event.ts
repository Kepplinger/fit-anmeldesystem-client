import { Moment } from 'moment';
import * as moment from 'moment';

export class Event {
  public id: number;
  public timestamp: string;

  public eventDate: Moment = moment();
  public registrationStart: Moment = moment();
  public registrationEnd: Moment = moment();
  public isLocked: boolean;

  public constructor(eventDate?: Moment,
                     registrationStart?: Moment,
                     registrationEnd?: Moment,
                     isLocked?: boolean,
                     id?: number) {
    this.id = id;
    this.eventDate = eventDate;
    this.registrationStart = registrationStart;
    this.registrationEnd = registrationEnd;
    this.isLocked = isLocked;
  }
}

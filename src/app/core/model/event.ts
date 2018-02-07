import { Moment } from 'moment';
import * as moment from 'moment';
import { Area } from './area';

export class Event {
  public id: number;
  public timestamp: string;

  public eventDate: Moment;
  public registrationStart: Moment;
  public registrationEnd: Moment;
  public areas: Area[];
  public isLocked: boolean;

  public constructor(eventDate: Moment = moment(),
                     registrationStart: Moment = moment(),
                     registrationEnd: Moment = moment(),
                     areas: Area[] = [],
                     isLocked?: boolean,
                     id?: number) {
    this.id = id;
    this.eventDate = eventDate;
    this.registrationStart = registrationStart;
    this.registrationEnd = registrationEnd;
    this.areas = areas;
    this.isLocked = isLocked;
  }
}

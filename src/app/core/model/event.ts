import { Area } from './area';
import { Moment } from 'moment';
import * as moment from 'moment';
import { RegistrationState } from './registration-state';

export class Event {
  public id: number;

  public eventDate: Moment;
  public registrationStart: Moment;
  public registrationEnd: Moment;
  public presentationsLocked: boolean;
  public areas: Area[];
  public registrationState: RegistrationState;

  public constructor(eventDate: Moment = moment(),
                     registrationStart: Moment = moment(),
                     registrationEnd: Moment = moment(),
                     presentationsLocked: boolean = false,
                     areas: Area[] = [],
                     registrationState: RegistrationState = new RegistrationState(),
                     id?: number) {
    this.id = id;
    this.eventDate = eventDate;
    this.registrationStart = registrationStart;
    this.registrationEnd = registrationEnd;
    this.presentationsLocked = presentationsLocked;
    this.areas = areas;
    this.registrationState = registrationState;
  }
}

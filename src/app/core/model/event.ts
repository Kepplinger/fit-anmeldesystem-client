import { Moment } from 'moment';

export class Event {
  public id: number;
  public date: Moment;
  public registrationStart: Moment;
  public registrationEnd: Moment;
  public isLocked: boolean;
  public timestamp: string;

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

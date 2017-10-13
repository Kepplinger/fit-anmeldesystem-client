import { Company } from './company';
import { Presentation } from './presentation';
import { DetailValue } from './detail-value';

export class Booking {
  public id: number;
  public eventId: number;
  public company: Company;
  public locationId: number;
  public presentation: Presentation;
  public categoryId: number;
  public details: DetailValue[];
  public isAccepted: boolean;

  public constructor(eventId?: number,
                     company?: Company,
                     locationId?: number,
                     presentation?: Presentation,
                     categoryId?: number,
                     details?: DetailValue[],
                     isAccepted?: boolean,
                     id?: number) {
    this.eventId = eventId;
    this.company = company;
    this.locationId = locationId;
    this.presentation = presentation;
    this.categoryId = categoryId;
    this.isAccepted = isAccepted;
    this.details = details;
    this.id = id;
  }
}


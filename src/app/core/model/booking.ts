import { Company } from './company';
import { Presentation } from './presentation';
import { Branch } from './branch';

export class Booking {
  public id: number;
  public timestamp: string;

  public eventId: number;
  public company: Company;
  public locationId: number;
  public presentation: Presentation;
  public categoryId: number;

  public branches: Branch[];
  public isAccepted: boolean; // TODO add to ERD
  public remarks: string;
  public additionalInfo: string;
  public companyDescription: string;
  public providesSummerJob: boolean;
  public providesThesis: boolean;

  public constructor(eventId?: number,
                     company?: Company,
                     locationId?: number,
                     presentation?: Presentation,
                     categoryId?: number,
                     branches?: Branch[],
                     isAccepted?: boolean,
                     remarks?: string,
                     additionalInfo?: string,
                     companyDescription?: string,
                     providesSummerJob?: boolean,
                     providesThesis?: boolean,
                     id?: number) {
    this.id = id;
    this.eventId = eventId;
    this.company = company;
    this.locationId = locationId;
    this.presentation = presentation;
    this.categoryId = categoryId;
    this.branches = branches;
    this.isAccepted = isAccepted;
    this.remarks = remarks;
    this.additionalInfo = additionalInfo;
    this.companyDescription = companyDescription;
    this.providesSummerJob = providesSummerJob;
    this.providesThesis = providesThesis;
  }
}


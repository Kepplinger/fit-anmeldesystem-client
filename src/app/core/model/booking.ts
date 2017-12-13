import { Company } from './company';
import { Presentation } from './presentation';
import { Location } from './location';
import { Branch } from './branch';
import { Representative } from './representative';
import { Resource } from './resource';

export class Booking {
  public id: number;
  public timestamp: string;

  public eventId: number;
  public packageId: number;
  public company: Company;
  public location: Location;
  public presentation: Presentation;
  public representatives: Representative[];
  public branches: Branch[];
  public resources: Resource[];

  public isAccepted: boolean; // TODO add to ERD
  public remarks: string;
  public additionalInfo: string;
  public companyDescription: string;
  public providesSummerJob: boolean;
  public providesThesis: boolean;

  public constructor(eventId?: number,
                     packageId?: number,
                     location?: Location,
                     company?: Company,
                     presentation?: Presentation,
                     representatives?: Representative[],
                     branches?: Branch[],
                     resources?: Resource[],
                     remarks?: string,
                     additionalInfo?: string,
                     companyDescription?: string,
                     providesSummerJob?: boolean,
                     providesThesis?: boolean,
                     isAccepted?: boolean,
                     id?: number) {
    this.id = id;
    this.eventId = eventId;
    this.company = company;
    this.location = location;
    this.presentation = presentation;
    this.packageId = packageId;
    this.representatives = representatives;
    this.branches = branches;
    this.resources = resources;
    this.isAccepted = isAccepted;
    this.remarks = remarks;
    this.additionalInfo = additionalInfo;
    this.companyDescription = companyDescription;
    this.providesSummerJob = providesSummerJob;
    this.providesThesis = providesThesis;
  }
}


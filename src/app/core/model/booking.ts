import { Company } from './company';
import { Presentation } from './presentation';
import { Location } from './location';
import { Event } from './event';
import { Branch } from './branch';
import { Representative } from './representative';
import { Resource } from './resource';
import { Package } from './package';
import { Moment } from 'moment';
import { Contact } from './contact';
import { DataFile } from './data-file';
import { IsAccepted } from './enums/is-accepted';

export class Booking {
  public id: number;
  public timestamp: string;

  public event: Event;
  public fitPackage: Package;
  public company: Company;
  public location: Location;
  public contact: Contact;
  public presentation: Presentation;
  public representatives: Representative[];
  public branches: Branch[];
  public resources: Resource[];

  public isAccepted: IsAccepted;
  public remarks: string;
  public additionalInfo: string;
  public companyDescription: string;
  public providesSummerJob: boolean;
  public providesThesis: boolean;

  public branch: string;
  public phoneNumber: string;
  public email: string;
  public homepage: string;
  public logo: DataFile;

  public establishmentsCountInt?: number;
  public establishmentsInt?: string[];
  public establishmentsCountAut?: number;
  public establishmentsAut?: string[];

  public creationDate: Moment;

  public constructor(event?: Event,
                     fitPackage?: Package,
                     location?: Location,
                     contact?: Contact,
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
                     branch?: string,
                     phoneNumber?: string,
                     email?: string,
                     homepage?: string,
                     logo?: DataFile,
                     establishmentsCountInt?: number,
                     establishmentsInt?: string[],
                     establishmentsCountAut?: number,
                     establishmentsAut?: string[],
                     isAccepted?: IsAccepted,
                     creationDate?: Moment,
                     id?: number) {
    this.id = id;
    this.event = event;
    this.company = company;
    this.location = location;
    this.contact = contact;
    this.presentation = presentation;
    this.fitPackage = fitPackage;
    this.representatives = representatives;
    this.branches = branches;
    this.resources = resources;
    this.isAccepted = isAccepted;
    this.remarks = remarks;
    this.additionalInfo = additionalInfo;
    this.companyDescription = companyDescription;
    this.providesSummerJob = providesSummerJob;
    this.providesThesis = providesThesis;
    this.branch = branch;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.homepage = homepage;
    this.logo = logo;
    this.establishmentsCountInt = establishmentsCountInt;
    this.establishmentsInt = establishmentsInt;
    this.establishmentsCountAut = establishmentsCountAut;
    this.establishmentsAut = establishmentsAut;
    this.creationDate = creationDate;

    if (company == null) {
      this.company = new Company();
    }

    if (contact == null) {
      this.contact = new Contact();
    }
  }
}


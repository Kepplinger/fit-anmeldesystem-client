import { EntityObject } from './contracts/entity-object';
import { Event } from './event';
import { Company } from './company';
import { Location } from './location';
import { Category } from './category';
import { Presentation } from './presentation';

export class Booking extends EntityObject {
  public event: Event;
  public company: Company;
  public location: Location;
  public presentation: Presentation;
  public category: Category;
  public isAccepted: boolean;


}


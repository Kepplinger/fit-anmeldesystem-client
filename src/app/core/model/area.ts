import { EntityObject } from './base-entity/entity-object';
import { Event } from './event';

export class Area extends EntityObject {
  public designation: string;
  public graphic: string;
  public event: Event;
}

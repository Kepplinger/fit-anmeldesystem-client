import { EntityObject } from './base-entity/entity-object';

export class Event extends EntityObject {
  public date: Date;
  public registrationStart: Date;
  public registrationEnd: Date;
  public isLocked: boolean;
}

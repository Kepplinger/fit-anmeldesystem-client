import { EntityObject } from './contracts/entity-object';

export class Presentation extends EntityObject {
  public roomNumber: string;
  public title: string;
  public description: string;
  public isAccepted: boolean;
}

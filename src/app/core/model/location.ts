import { EntityObject } from './contracts/entity-object';
import { Area } from './area';

export class Location extends EntityObject {
  public number: number;
  public area: Area;
  public xCoordinate: number;
  public yCoordinate: number;
}

import { EntityObject } from './base-entity/entity-object';

export class Category extends EntityObject {
  public name: string;
  public price: number;
  public description: string;
  public location: Location;
}

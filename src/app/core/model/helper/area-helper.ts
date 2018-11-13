import { Area } from '../area';
import { Location } from '../location';
import { LocationHelper } from './location-helper';

export class AreaHelper {
  public static clone(area: Area): Area {

    let clone = new Area();

    clone.id = area.id;
    clone.timestamp = area.timestamp;
    clone.graphic = area.graphic;
    clone.designation = area.designation;
    clone.locations = [];

    area.locations.forEach((l: Location) => {
      clone.locations.push(LocationHelper.clone(l));
    });

    return clone;
  }
}

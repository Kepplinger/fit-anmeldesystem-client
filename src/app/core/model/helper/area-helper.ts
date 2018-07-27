import { Area } from '../area';
import { Location } from '../location';
import { LocationHelper } from './location-helper';
import { DataFileHelper } from './data-file-helper';

export class AreaHelper {
  public static clone(area: Area): Area {

    let clone = new Area();

    clone.id = area.id;
    clone.timestamp = area.timestamp;
    clone.graphic = area.graphic;
    clone.designation = area.designation;
    clone.locations = [];

    area.locations.forEach((l: Location) => {
      clone.locations.push(l);
    });

    return clone;

  }

  public static compare(first: Area, second: Area): boolean {
    return first.designation === second.designation &&
      DataFileHelper.compare(first.graphic, second.graphic) &&
      first.id === second.id &&
      first.locations.every(l1 => second.locations.some(l2 => LocationHelper.compare(l1, l2))) &&
      second.locations.every(l1 => first.locations.some(l2 => LocationHelper.compare(l1, l2)));
  }
}

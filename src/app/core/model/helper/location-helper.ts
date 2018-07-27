import { Location } from '../location';

export class LocationHelper {
  public static compare(first: Location, second: Location): boolean {
    return first.id === second.id &&
      first.category === second.category &&
      first.isOccupied === second.isOccupied &&
      first.number === second.number &&
      first.xCoordinate === second.xCoordinate &&
      first.yCoordinate === second.yCoordinate;
  }
}

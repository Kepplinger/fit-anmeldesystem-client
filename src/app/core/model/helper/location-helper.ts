import { Location } from '../location';

export class LocationHelper {

  public static clone(location: Location): Location {
    return new Location(
      location.number,
      location.isOccupied,
      location.category,
      location.xCoordinate,
      location.yCoordinate,
      location.id,
      location.timestamp
    );
  }

  public static compare(first: Location, second: Location): boolean {
    return first.id === second.id &&
      first.category === second.category &&
      first.isOccupied === second.isOccupied &&
      first.number === second.number &&
      first.xCoordinate === second.xCoordinate &&
      first.yCoordinate === second.yCoordinate;
  }
}

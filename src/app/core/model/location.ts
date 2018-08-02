export class Location {
  public id: number;
  public timestamp: string;

  public number: string;
  public category: string;
  public isOccupied: boolean;
  public xCoordinate: number;
  public yCoordinate: number;

  public constructor(number?: string,
                     isOccupied?: boolean,
                     category?: string,
                     xCoordinate?: number,
                     yCoordinate?: number,
                     id?: number,
                     timestamp?: string) {
    this.id = id;
    this.isOccupied = isOccupied;
    this.number = number;
    this.category = category;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.timestamp = timestamp;
  }
}

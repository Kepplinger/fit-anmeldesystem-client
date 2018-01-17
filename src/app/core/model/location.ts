import { Area } from './area';

export class Location {
  public id: number;
  public timestamp: string;

  public number: string;
  public category: string;
  public isOccupied: boolean;
  public area: Area;
  public xCoordinate: number;
  public yCoordinate: number;

  public constructor(number?: string,
                     isOccupied?: boolean,
                     area?: Area,
                     category?: string,
                     xCoordinate?: number,
                     yCoordinate?: number,
                     id?: number) {
    this.id = id;
    this.isOccupied = isOccupied;
    this.number = number;
    this.area = area;
    this.category = category;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
  }
}

import { Area } from './area';

export class Location {
  public id: number;
  public number: number;
  public area: Area;
  public xCoordinate: number;
  public yCoordinate: number;

  public constructor(number?: number,
                     area?: Area,
                     xCoordinate?: number,
                     yCoordinate?: number,
                     id?: number) {
    this.id = id;
    this.number = number;
    this.area = area;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
  }
}

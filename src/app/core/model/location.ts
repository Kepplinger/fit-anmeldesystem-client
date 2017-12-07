import { Area } from './area';

export class Location {
  public id: number;
  public timestamp: string;

  public number: number;
  public category: string;
  public area: Area;
  public xCoordinate: number;
  public yCoordinate: number;

  public constructor(number?: number,
                     area?: Area,
                     category?: string,
                     xCoordinate?: number,
                     yCoordinate?: number,
                     id?: number) {
    this.id = id;
    this.number = number;
    this.area = area;
    this.category = category;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
  }
}

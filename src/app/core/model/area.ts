import { Location } from './location';
import { DataFile } from './data-file';

export class Area {
  public id: number;
  public timestamp: string;

  public designation: string;
  public graphic: DataFile;
  public locations: Location[];

  public constructor(designation?: string,
                     graphic?: DataFile,
                     id?: number) {
    this.id = id;
    this.designation = designation;
    this.graphic = graphic;
    this.locations = [];
  }
}

import { Location } from './location';

export class Area {
  public id: number;
  public timestamp: string;

  public designation: string;
  public graphicUrl: string;
  public locations: Location[];

  public constructor(designation?: string,
                     graphicUrl?: string,
                     id?: number) {
    this.id = id;
    this.designation = designation;
    this.graphicUrl = graphicUrl;
    this.locations = [];
  }
}

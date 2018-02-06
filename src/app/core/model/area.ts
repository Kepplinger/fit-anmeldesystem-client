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
    this.locations = [
      new Location('213', false, 'B', 10, 10),
      new Location('123', false, 'A', 62.63, 12.23),
      new Location('078', true, 'B', 34.2, 48.23),
      new Location('137', false, 'B', 24.5, 75.23),
      new Location('223', false, 'B', 40, 23),
      new Location('065', true, 'A', 89, 23),
      new Location('005', true, 'B', 67, 78),
      new Location('102', false, 'A', 54, 64),
      new Location('252', false, 'B', 23, 45),
    ];
  }
}

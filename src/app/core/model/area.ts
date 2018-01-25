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
      new Location('213', false, 'B', 10, 10, 1),
      new Location('123', false, 'A', 62.63, 12.23, 2),
      new Location('078', true, 'B', 34.2, 48.23, 3),
      new Location('137', false, 'B', 24.5, 75.23, 4),
      new Location('013', false, 'B', 40, 23, 5),
      new Location('013', true, 'A', 89, 23, 6),
      new Location('013', true, 'B', 67, 78, 7),
      new Location('013', false, 'A', 54, 64, 8),
      new Location('013', false, 'B', 23, 45, 9),
    ];
  }
}

import { Location } from './location';

export class Area {
  public id: number;
  public timestamp: string;

  public eventId: number;
  public designation: string;
  public graphicUrl: string;
  public locations: Location[];

  public constructor(designation?: string,
                     graphicUrl?: string,
                     eventId?: number,
                     id?: number) {
    this.id = id;
    this.designation = designation;
    this.graphicUrl = graphicUrl;
    this.eventId = eventId;
    this.locations = [
      new Location('213', false, this, 'B', 10, 10, 1),
      new Location('123', false, this, 'A', 62.63, 12.23, 2),
      new Location('078', true, this, 'B', 34.2, 48.23, 3),
      new Location('137', false, this, 'B', 24.5, 75.23, 4),
      new Location('013', false, this, 'B', 40, 23, 5),
      new Location('013', true, this, 'A', 89, 23, 6),
      new Location('013', true, this, 'B', 67, 78, 7),
      new Location('013', false, this, 'A', 54, 64, 8),
      new Location('013', false, this, 'B', 23, 45, 9),
    ];
  }
}

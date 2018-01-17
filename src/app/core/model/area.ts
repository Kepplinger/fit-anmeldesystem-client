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
      new Location('213', false, this, 'A', 10, 10, 1),
      new Location('123', false, this, 'A', 62.63, 12.23, 1),
      new Location('078', true, this, 'B', 34.2, 48.23, 1),
      new Location('137', false, this, 'B', 24.5, 75.23, 1),
      new Location('013', false, this, 'A', 40, 23, 1),
      new Location('013', true, this, 'A', 89, 23, 1),
      new Location('013', true, this, 'A', 67, 78, 1),
      new Location('013', false, this, 'A', 54, 64, 1),
      new Location('013', false, this, 'A', 23, 45, 1),
    ];
  }
}

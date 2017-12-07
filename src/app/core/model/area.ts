export class Area {
  public id: number;
  public timestamp: string;

  public designation: string;
  public graphicUrl: string;
  public eventId: number;

  public constructor(designation?: string,
                     graphicUrl?: string,
                     eventId?: number,
                     id?: number) {
    this.id = id;
    this.designation = designation;
    this.graphicUrl = graphicUrl;
    this.eventId = eventId;
  }
}

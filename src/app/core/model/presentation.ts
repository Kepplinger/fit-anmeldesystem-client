export class Presentation {
  public id: number;
  public timestamp: string;

  public title: string;
  public description: string;
  public roomNumber: string;
  public isAccepted: boolean; // TODO is accepted
  public fileUrl: string;

  public constructor(roomNumber?: string,
                     title?: string,
                     description?: string,
                     isAccepted?: boolean,
                     fileUrl?: string,
                     id?: number) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.title = title;
    this.description = description;
    this.fileUrl = fileUrl;
    this.isAccepted = isAccepted;
  }
}

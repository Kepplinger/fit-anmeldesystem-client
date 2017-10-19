export class Presentation {
  public id: number;
  public roomNumber: string;
  public title: string;
  public description: string;
  public isAccepted: boolean;
  public timestamp: string;

  public constructor(roomNumber?: string,
                     title?: string,
                     description?: string,
                     isAccepted?: boolean,
                     id?: number) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.title = title;
    this.description = description;
    this.isAccepted = isAccepted;
  }
}

import { Branch } from './branch';

export class Presentation {
  public id: number;
  public timestamp: string;

  public title: string;
  public description: string;
  public roomNumber: string;
  public isAccepted: boolean;
  public fileUrl: string;
  public branches: Branch[] = [];

  public constructor(roomNumber?: string,
                     title?: string,
                     description?: string,
                     isAccepted?: boolean,
                     fileUrl?: string,
                     branches?: Branch[],
                     id?: number) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.title = title;
    this.description = description;
    this.fileUrl = fileUrl;
    this.isAccepted = isAccepted;
    this.branches = branches;
  }
}

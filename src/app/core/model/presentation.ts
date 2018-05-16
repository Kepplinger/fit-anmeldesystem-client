import { Branch } from './branch';
import { DataFile } from './data-file';

export class Presentation {
  public id: number;
  public timestamp: string;

  public title: string;
  public description: string;
  public roomNumber: string;
  public isAccepted: boolean;
  public file: DataFile;
  public branches: Branch[] = [];

  public constructor(roomNumber?: string,
                     title?: string,
                     description?: string,
                     isAccepted?: boolean,
                     file?: DataFile,
                     branches?: Branch[],
                     id?: number) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.title = title;
    this.description = description;
    this.file = file;
    this.isAccepted = isAccepted;
    this.branches = branches;
  }
}

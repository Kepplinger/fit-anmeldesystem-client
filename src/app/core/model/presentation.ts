import { DataFile } from './data-file';
import { IsAccepted } from './enums/is-accepted';
import { Branch } from './branch';

export class Presentation {
  public id: number;
  public timestamp: string;

  public title: string;
  public description: string;
  public roomNumber: string;
  public isAccepted: IsAccepted;
  public file: DataFile;
  public branches: Branch[] = [];

  public constructor(roomNumber?: string,
                     title?: string,
                     description?: string,
                     isAccepted?: IsAccepted,
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

    if (this.roomNumber == null) {
      this.roomNumber = '';
    }
  }
}

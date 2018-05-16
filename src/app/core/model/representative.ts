import { DataFile } from './data-file';

export class Representative {
  public id: number;
  public timestamp: string;

  public name: string;
  public email: string;
  public image: DataFile;

  public constructor(name?: string,
                     email?: string,
                     image?: DataFile,
                     id?: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.image = image;
  }
}

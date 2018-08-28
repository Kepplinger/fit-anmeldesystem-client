export class Branch {
  public id: number;
  public timestamp: string;

  public name: string;
  public isArchive: boolean;

  public constructor(name?: string,
                     isArchive?: boolean,
                     id?: number) {
    this.id = id;
    this.isArchive = isArchive;
    this.name = name;
  }
}

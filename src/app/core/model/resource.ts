export class Resource {
  public id: number;
  public timestamp: string;

  public name: string;
  public isArchive: boolean;

  public constructor(name?: string,
                     isArchive?: boolean,
                     id?: number) {
    this.id = id;
    this.name = name;
    this.isArchive = isArchive;
  }
}

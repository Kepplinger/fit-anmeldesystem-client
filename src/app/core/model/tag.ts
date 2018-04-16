export class Tag {
  public id: number;
  public timestamp: string;

  public value: string;
  public isArchive: boolean;

  public constructor(value?: string,
                     isArchive?: boolean,
                     id?: number) {
    this.value = value;
    this.isArchive = isArchive;
    this.id = id;
  }
}

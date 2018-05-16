export class DataFile {
  public id: number;
  public timestamp: string;

  public name: string;
  public dataUrl: string;

  public constructor(name?: string,
                     dataUrl?: string,
                     id?: number) {
    this.name = name;
    this.dataUrl = dataUrl;
    this.id = id;
  }
}

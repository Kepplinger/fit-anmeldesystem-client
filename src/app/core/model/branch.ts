export class Branch {
  public id: number;
  public timestamp: string;
  public name: string;

  public constructor(name?: string,
                     id?: number) {
    this.id = id;
    this.name = name;
  }
}

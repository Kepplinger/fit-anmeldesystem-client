export class Resource {
  public id: number;
  public timestamp: string;

  public name: string;
  public description: string;

  public constructor(name?: string,
                     description?: string,
                     id?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

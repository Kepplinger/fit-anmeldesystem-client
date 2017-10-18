export class Detail {
  public id: number;
  public description: string;
  public timestamp: string;

  public constructor(description?: string,
                     id?: number) {
    this.id = id;
    this.description = description;
  }
}

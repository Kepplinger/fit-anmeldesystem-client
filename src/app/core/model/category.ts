export class Category {
  public id: number;
  public name: string;
  public price: number;
  public description: string;
  public timestamp: string;

  public constructor(name?: string,
                     price?: number,
                     description?: string,
                     id?: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
  }
}

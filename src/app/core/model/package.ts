export class Package {
  public id: number;
  public timestamp: string;

  public name: string;
  public price: number;
  public discriminator: string;

  public constructor(name?: string,
                     price?: number,
                     discriminator?: string,
                     id?: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.discriminator = discriminator;
  }
}

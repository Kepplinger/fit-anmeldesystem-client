export class Package {
  public id: number;
  public timestamp: string;

  public name: string;
  public price: number;
  public discriminator: number;

  public constructor(name?: string,
                     price?: number,
                     discriminator?: number,
                     id?: number,
                     timestamp?: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.discriminator = discriminator;
    this.timestamp = timestamp;
  }
}

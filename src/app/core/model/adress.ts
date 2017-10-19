export class Address {
  public id: number;
  public city: string;
  public postalCode: string;
  public street: string;
  public timestamp: string;

  public constructor(city?: string,
                     postalCode?: string,
                     street?: string,
                     id?: number) {
    this.id = id;
    this.city = city;
    this.postalCode = postalCode;
    this.street = street;
  }
}

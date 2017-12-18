export class Address {
  public id: number;
  public timestamp: string;

  public city: string;
  public zipCode: string;
  public street: string;
  public streetNumber: string;
  public addition: string;

  public constructor(city?: string,
                     zipCode?: string,
                     street?: string,
                     streetNumber?: string,
                     addition?: string,
                     id?: number) {
    this.id = id;
    this.city = city;
    this.zipCode = zipCode;
    this.street = street;
    this.streetNumber = streetNumber;
    this.addition = addition;
  }
}

export class Address {
  public id: number;
  public timestamp: string;

  public city: string;
  public zipCode: string;
  public street: string;
  public houseNumber: string;
  public addition: string;

  public constructor(city?: string,
                     zipCode?: string,
                     street?: string,
                     houseNumber?: string,
                     addition?: string,
                     id?: number) {
    this.id = id;
    this.city = city;
    this.zipCode = zipCode;
    this.street = street;
    this.houseNumber = houseNumber;
    this.addition = addition;
  }
}

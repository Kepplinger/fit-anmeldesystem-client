export class Contact {
  public id: number;
  public timestamp: string;

  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;


  public constructor(firstName?: string,
                     lastName?: string,
                     email?: string,
                     phone?: string,
                     id?: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }
}

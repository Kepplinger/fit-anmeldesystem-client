export class Representative {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public imageUrl: string;
  public phone: string;
  public timestamp: string;

  public constructor(firstName?: string,
                     lastName?: string,
                     email?: string,
                     imageUrl?: string,
                     phone?: string,
                     id?: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.imageUrl = imageUrl;
    this.phone = phone;
  }
}

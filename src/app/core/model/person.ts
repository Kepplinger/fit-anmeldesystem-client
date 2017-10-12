export class Person {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public imageUrl: string;
  public phoneNumber: string;

  public constructor(firstName?: string,
                     lastName?: string,
                     email?: string,
                     imageUrl?: string,
                     phoneNumber?: string,
                     id?: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.imageUrl = imageUrl;
    this.phoneNumber = phoneNumber;
  }
}

export class Contact {
  public id: number;
  public timestamp: string;

  public firstName: string;
  public lastName: string;
  public gender: string;
  public email: string;
  public phoneNumber: string;

  public constructor(firstName?: string,
                     lastName?: string,
                     gender?: string,
                     email?: string,
                     phoneNumber?: string,
                     id?: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}

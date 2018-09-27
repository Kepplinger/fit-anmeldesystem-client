import { Address } from './address';

export class Graduate {
  public id: number;
  public timestamp: string;

  public firstName: string;
  public lastName: string;
  public address: Address;
  public email: string;
  public phoneNumber: string;
  public gender: string;
  public graduationYear: number;

  public constructor(firstName?: string,
                     lastName?: string,
                     address?: Address,
                     email?: string,
                     phoneNumber?: string,
                     gender?: string,
                     graduationYear?: number,
                     id?: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.graduationYear = graduationYear;
  }
}

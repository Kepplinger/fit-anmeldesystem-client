export class FolderInfo {
  public id: number;
  public timestamp: string;

  public branch: string;
  public phoneNumber: string;
  public email: string;
  public homepage: string;
  public logo: string;

  public establishmentsCountInt?: number;
  public establishmentsInt?: string[];
  public establishmentsCountAut?: number;
  public establishmentsAut?: string[];

  public constructor(branch?: string,
                     phoneNumber?: string,
                     email?: string,
                     homepage?: string,
                     logo?: string,
                     establishmentsCountInt?: number,
                     establishmentsInt?: string[],
                     establishmentsCountAut?: number,
                     establishmentsAut?: string[]) {
    this.branch = branch;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.homepage = homepage;
    this.logo = logo;
    this.establishmentsCountInt = establishmentsCountInt;
    this.establishmentsInt = establishmentsInt;
    this.establishmentsCountAut = establishmentsCountAut;
    this.establishmentsAut = establishmentsAut;
  }
}

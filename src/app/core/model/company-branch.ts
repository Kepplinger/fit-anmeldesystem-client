import { Company } from './company';
import { Branch } from './branch';

export class CompanyBranch {
  public id: number;
  public timestamp: string;

  public fk_Company: number;
  public company: Company;

  public fk_Branch: number;
  public branch: Branch;

  public constructor(fk_Company: number, fk_Branch: number) {
    this.fk_Company = fk_Company;
    this.fk_Branch = fk_Branch;
  }
}

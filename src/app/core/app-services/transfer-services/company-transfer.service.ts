import { Injectable } from '@angular/core';
import { Company } from '../../model/company';

@Injectable()
export class CompanyTransferService {

  private company: Company;

  public constructor() {
    let company = JSON.parse(sessionStorage.getItem('company'));
    if (company != null) {
      this.company = company;
    }
  }

  public addCompany(company: Company): void {
    if (company.id != null) {
      this.company = company;
      sessionStorage.setItem('company', JSON.stringify(this.company));
    }
  }

  public getCompany(companyId: number): Company {
    if (this.company.id === companyId) {
      return this.company;
    } else {
      return this.company;
    }
  }
}

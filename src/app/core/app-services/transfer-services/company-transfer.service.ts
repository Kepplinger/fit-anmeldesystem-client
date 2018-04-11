import { Injectable } from '@angular/core';
import { Company } from '../../model/company';

@Injectable()
export class CompanyTransferService {

  private companyBuffer: Company[] = [];

  public addCompany(company: Company): void {
    if (company.id != null) {
      this.companyBuffer.push(company);
    }
  }

  public getCompany(companyId: number): Company {
    let company: Company = this.companyBuffer.find(b => b.id === companyId);

    if (company != null) {
      this.companyBuffer.splice(this.companyBuffer.indexOf(company), 1);
    }

    return company;
  }
}

import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../core/model/company';
import { CompanyDAO } from '../../../../core/dao/company.dao';
import { ArrayUtils } from '../../../../core/utils/array-utils';

@Component({
  selector: 'fit-verify-companies',
  templateUrl: './verify-companies.component.html',
  styleUrls: ['./verify-companies.component.scss']
})
export class VerifyCompaniesComponent implements OnInit {

  public pendingCompanies: Company[];
  public companies: Company[];

  public filterText: string = '';
  public isAssigning: boolean = false;
  public companyToAssign: Company;

  public constructor(private companyDAO: CompanyDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.pendingCompanies = await this.companyDAO.fetchPendingCompanies();
    this.companies = await this.companyDAO.fetchCompanies();
  }

  public selectCompanyForAssigning(company: Company) {
    this.isAssigning = true;
    this.companyToAssign = company;
  }

  public cancelAssiging(): void {
    this.isAssigning = false;
    this.companyToAssign = null;
  }

  public async removeCompany(company: Company): Promise<void> {
    this.companyDAO.deleteCompany(company);
    ArrayUtils.deleteElement(this.pendingCompanies, company);
  }

  public async verifyCompany(company: Company): Promise<void> {
    this.companyDAO.verifyCompany(company);
    ArrayUtils.deleteElement(this.pendingCompanies, company);
    this.companies.push(company);
  }

  public getFilteredCompanies(): Company[] {
    if (this.filterText !== '') {
      return this.companies.filter(c => c.name.includes(this.filterText));
    } else {
      return this.companies;
    }
  }
}

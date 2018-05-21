import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../core/model/company';
import { CompanyDAO } from '../../../../core/dao/company.dao';
import { ArrayUtils } from '../../../../core/utils/array-utils';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'fit-verify-companies',
  templateUrl: './verify-companies.component.html',
  styleUrls: ['./verify-companies.component.scss']
})
export class VerifyCompaniesComponent implements OnInit {

  public pendingCompanies: Company[] = [];
  public companies: Company[] = [];

  public filterText: string = '';
  public isAssigning: boolean = false;
  public companyToAssign: Company;

  public constructor(private companyDAO: CompanyDAO,
                     private toastr: ToastrService) {
  }

  public async ngOnInit(): Promise<void> {
    this.pendingCompanies = await this.companyDAO.fetchPendingCompanies();
    this.companies = await this.companyDAO.fetchAllCompanies();
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
    await this.companyDAO.deleteCompany(company);
    ArrayUtils.deleteElement(this.pendingCompanies, company);
    this.toastr.warning('Firmen-Antrag wurde gelöscht', 'Antrag gelöscht!');
  }

  public async verifyCompany(company: Company): Promise<void> {
    await this.companyDAO.verifyCompany(company);
    ArrayUtils.deleteElement(this.pendingCompanies, company);
    this.companies.push(company);
    this.toastr.success('Firma wurde erfolgreich bestätigt', 'Bastätigung erfolgreich!');
  }

  public getFilteredCompanies(): Company[] {
    if (this.filterText !== '') {
      return this.companies.filter(c => c.name.includes(this.filterText));
    } else {
      return this.companies;
    }
  }

  public async assignCompany(pendingCompany: Company, existingCompany: Company): Promise<void> {
    await this.companyDAO.assignCompany(pendingCompany, existingCompany);
    ArrayUtils.deleteElement(this.pendingCompanies, pendingCompany);
    this.companyToAssign = null;
    this.toastr.success('Der Antrag wurde einer bestehenden Firma zugewiesen', 'Zuweisung erfolgreich!');
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Company } from '../../../../core/model/company';
import { CompanyDAO } from '../../../../core/dao/company.dao';
import { IsAccepted } from '../../../../core/model/enums/is-accepted';
import { CompaniesService } from '../../services/companies.service';
import { BaseSubscriptionComponent } from '../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-accept-companies',
  templateUrl: './accept-companies.component.html',
  styleUrls: ['./accept-companies.component.scss']
})
export class AcceptCompaniesComponent extends BaseSubscriptionComponent implements OnInit, OnDestroy {

  public pendingCompanies: Company[] = [];
  public companies: Company[] = [];

  public filterText: string = '';
  public isAssigning: boolean = false;
  public companyToAssign: Company;
  public isLoading: boolean = false;

  public constructor(private companyDAO: CompanyDAO,
                     private companiesService: CompaniesService,
                     private toastr: ToastrService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.companiesService.reloadCompanies();
    this.pendingCompanies = this.companiesService.pendingCompanies.getValue();
    this.companies = this.companiesService.companies.getValue();

    this.isLoading = this.companiesService.isLoading.getValue();
    this.addSub(this.companiesService.isLoading.subscribe(l => this.isLoading = l));

    this.addSub(this.companiesService.pendingCompanies.subscribe(c => this.pendingCompanies = c));
    this.addSub(this.companiesService.companies.subscribe(c => this.companies = c));
  }

  public selectCompanyForAssigning(company: Company) {
    this.isAssigning = true;
    this.companyToAssign = company;
  }

  public cancelAssigning(): void {
    this.isAssigning = false;
    this.companyToAssign = null;
  }

  public async rejectCompany(company: Company): Promise<void> {
    company = await this.companyDAO.acceptCompany(company, IsAccepted.Rejected);
    this.companiesService.updateCompany(company);
    this.toastr.warning('Firmen-Antrag wurde abgelehnt', 'Antrag abgelehnt!');
  }

  public async acceptCompany(company: Company): Promise<void> {
    company = await this.companyDAO.acceptCompany(company, IsAccepted.Accepted);
    this.companiesService.updateCompany(company);
    this.toastr.success('Firma wurde erfolgreich bestätigt', 'Firma bestätigt!');
  }

  public getFilteredCompanies(): Company[] {
    if (this.filterText !== '') {
      return this.companies.filter(c => c.name.includes(this.filterText));
    } else {
      return this.companies;
    }
  }

  public async assignCompany(pendingCompany: Company, existingCompany: Company): Promise<void> {
    pendingCompany = await this.companyDAO.assignCompany(pendingCompany, existingCompany);
    this.companiesService.updateCompany(pendingCompany);
    this.companyToAssign = null;
    this.isAssigning = false;
    this.toastr.success('Der Antrag wurde einer bestehenden Firma zugewiesen', 'Zuweisung erfolgreich!');
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Company } from '../../../../core/model/company';
import { CompanyDAO } from '../../../../core/dao/company.dao';
import { ArrayUtils } from '../../../../core/utils/array-utils';
import { IsAccepted } from '../../../../core/model/enums/is-accepted';
import { CompaniesService } from '../../../../core/app-services/companies.service';
import { SubscriptionUtils } from '../../../../core/utils/subscription-utils';

@Component({
  selector: 'fit-accept-companies',
  templateUrl: './accept-companies.component.html',
  styleUrls: ['./accept-companies.component.scss']
})
export class AcceptCompaniesComponent implements OnInit, OnDestroy {

  public pendingCompanies: Company[] = [];
  public companies: Company[] = [];

  public filterText: string = '';
  public isAssigning: boolean = false;
  public companyToAssign: Company;

  private subs: Subscription[] = [];

  public constructor(private companyDAO: CompanyDAO,
                     private companiesService: CompaniesService,
                     private toastr: ToastrService) {
  }

  public async ngOnInit(): Promise<void> {
    this.pendingCompanies = this.companiesService.pendingCompanies.getValue();
    this.companies = this.companiesService.companies.getValue();

    this.subs.push(this.companiesService.pendingCompanies.subscribe(c => this.pendingCompanies = c));
    this.subs.push(this.companiesService.companies.subscribe(c => this.companies = c));
  }

  public ngOnDestroy(): void {
    SubscriptionUtils.unsubscribeMultiple(this.subs);
  }

  public selectCompanyForAssigning(company: Company) {
    this.isAssigning = true;
    this.companyToAssign = company;
  }

  public cancelAssiging(): void {
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
    await this.companyDAO.assignCompany(pendingCompany, existingCompany);
    this.companiesService.deleteCompany(pendingCompany);
    this.companyToAssign = null;
    this.toastr.success('Der Antrag wurde einer bestehenden Firma zugewiesen', 'Zuweisung erfolgreich!');
  }
}

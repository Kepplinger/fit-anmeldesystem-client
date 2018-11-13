import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Company } from '../../../core/model/company';
import { CompanyDAO } from '../../../core/dao/company.dao';
import { IsAccepted } from '../../../core/model/enums/is-accepted';
import { DataUpdateNotifier } from '../../../core/app-services/data-update-notifier';

@Injectable()
export class CompaniesService {

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public companies: BehaviorSubject<Company[]> = new BehaviorSubject([]);
  public pendingCompanies: BehaviorSubject<Company[]> = new BehaviorSubject([]);
  public rejectedCompanies: BehaviorSubject<Company[]> = new BehaviorSubject([]);

  private allCompanies: Company[] = [];

  public constructor(private companyDAO: CompanyDAO,
                     private dataUpdateNotifier: DataUpdateNotifier) {
    this.reloadCompanies();
    this.dataUpdateNotifier.companyUpdated.subscribe(c => this.updateCompany(c));
    this.dataUpdateNotifier.companyAdded.subscribe(c => this.addCompany(c));
  }

  public async reloadCompanies(): Promise<void> {
    if (this.companies.getValue().length === 0) {
      this.isLoading.next(true);
    }
    this.allCompanies = await this.companyDAO.fetchCompanies();
    this.isLoading.next(false);
    this.filterCompanies();
  }

  public addCompany(company: Company) {
    this.allCompanies.push(company);
    this.filterCompanies();
  }

  public deleteCompany(company: Company) {
    this.allCompanies.splice(this.allCompanies.findIndex(c => c.id === company.id), 1);
    this.filterCompanies();
  }

  public updateCompany(company: Company) {
    this.allCompanies[this.allCompanies.findIndex(c => c.id === company.id)] = company;
    this.filterCompanies();
  }

  private filterCompanies() {
    this.companies.next(this.allCompanies.filter(c => c.isAccepted === IsAccepted.Accepted));
    this.pendingCompanies.next(this.allCompanies.filter(c => c.isAccepted === IsAccepted.Pending));
    this.rejectedCompanies.next(this.allCompanies.filter(c => c.isAccepted === IsAccepted.Rejected));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Company } from '../model/company';
import { CompanyDAO } from '../dao/company.dao';
import { IsAccepted } from '../model/enums/is-accepted';

@Injectable()
export class CompaniesService {

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public companies: BehaviorSubject<Company[]> = new BehaviorSubject([]);
  public pendingCompanies: BehaviorSubject<Company[]> = new BehaviorSubject([]);
  public rejectedCompanies: BehaviorSubject<Company[]> = new BehaviorSubject([]);

  private allCompanies: Company[] = [];

  public constructor(private companyDAO: CompanyDAO) {
    this.updateCompanies();
  }

  public async updateCompanies(): Promise<void> {
    this.isLoading.next(true);
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

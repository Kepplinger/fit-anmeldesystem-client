import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '../../../../../core/model/company';
import { CompaniesService } from '../../../services/companies.service';
import { ArrayUtils } from '../../../../../core/utils/array-utils';
import { BaseSubscriptionComponent } from '../../../../../core/base-components/base-subscription.component';
import { ChangeProtocol } from '../../../../../core/model/change-protocol';

@Component({
  selector: 'fit-changelog-company-list',
  templateUrl: './changelog-company-list.component.html',
  styleUrls: ['./changelog-company-list.component.scss']
})
export class ChangelogCompanyListComponent extends BaseSubscriptionComponent implements OnInit {

  public orderedCompanies: Company[] = [];
  public isLoading: boolean = false;

  @Input()
  public showCompanies: boolean = true;

  @Input()
  public changelog: ChangeProtocol[] = [];

  @Input()
  public selectedCompany: Company;

  @Output()
  public selectedCompanyChange: EventEmitter<Company> = new EventEmitter<Company>();

  public constructor(private companiesService: CompaniesService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.subscribeToCompanyChanges();
    this.subscribeToIsLoadingChanges();

    if (this.orderedCompanies.length > 0) {
      this.emitSelectedCompany(ArrayUtils.getFirstElement<Company>(this.orderedCompanies));
    }
  }

  public emitSelectedCompany(company: Company): void {
    this.selectedCompanyChange.emit(company);
  }

  public getChangeCountForCompany(company: Company): number {
    if (this.changelog != null) {
      return this.changelog.filter(c => c.companyId === company.id && c.isPending).length;
    } else {
      return 0;
    }
  }

  private subscribeToCompanyChanges(): void {
    this.orderedCompanies = this.getOrderedCompanies(this.companiesService.companies.getValue());
    this.addSub(this.companiesService.companies.subscribe(c => this.orderedCompanies = this.getOrderedCompanies(c)));
  }

  private subscribeToIsLoadingChanges(): void {
    this.isLoading = this.companiesService.isLoading.getValue();
    this.addSub(this.companiesService.isLoading.subscribe(l => this.isLoading = l));
  }

  private getOrderedCompanies(companies: Company[]): Company[] {
    return companies.sort((a: Company, b: Company) => {
      return this.getChangeCountForCompany(b) - this.getChangeCountForCompany(a);
    });
  }
}

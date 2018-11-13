import { Component, OnInit } from '@angular/core';
import { SendMailFilter } from '../../../../core/app-helper/helper-model/send-mail-filter';
import { Company } from '../../../../core/model/company';
import { BookingDAO } from '../../../../core/dao/booking.dao';
import { CompaniesService } from '../../services/companies.service';
import { BaseSubscriptionComponent } from '../../../../core/base-components/base-subscription.component';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'fit-send-mails',
  templateUrl: './send-mails.component.html',
  styleUrls: ['./send-mails.component.scss']
})
export class SendMailsComponent extends BaseSubscriptionComponent implements OnInit {

  public filter: SendMailFilter;
  public filteredCompanies: Company[] = [];
  public mailTargetCompanies: Company[] = [];

  public isMailSelectionOpen: boolean = false;
  public isLoading: boolean = false;

  public constructor(private companiesService: CompaniesService,
                     private bookingDAO: BookingDAO,
                     private bookingsService: BookingsService) {
    super();
    this.filter = new SendMailFilter();
  }

  public ngOnInit(): void {
    this.filteredCompanies = this.companiesService.companies.getValue();
    this.addSub(this.companiesService.companies.subscribe(() => this.filterCompanies()));
    this.mailTargetCompanies = this.filteredCompanies;

    this.isLoading = this.companiesService.isLoading.getValue();

    this.addSub(this.companiesService.isLoading.subscribe(l => {
      if (!this.filter.useCurrentFitOnly) {
        this.isLoading = l;
      }
    }));

    this.addSub(this.bookingsService.isLoading.subscribe(l => {
      if (this.filter.useCurrentFitOnly) {
        this.isLoading = l;
      }
    }));
  }

  public async filterCompanies(): Promise<void> {
    if (this.filter.useCurrentFitOnly) {
      this.filteredCompanies = this.bookingsService.bookings.getValue().map(b => b.company).filter(c => this.companyFilter(c));
    } else {
      this.filteredCompanies = this.companiesService.companies.getValue().filter(c => this.companyFilter(c));
    }
  }

  public openMailSelection(companies: Company[]): void {
    this.mailTargetCompanies = companies;
    this.changeMailSelection(true);
  }

  public changeMailSelection(value: boolean): void {
    this.isMailSelectionOpen = value;
  }

  private companyFilter(c: Company): boolean {
    return (c.name.toUpperCase().includes(this.filter.searchText.toUpperCase()))
      && (this.filter.branches.length === 0 || c.branches.some(cb => this.filter.branches.some(b => b.id === cb.fk_Branch)))
      && (this.filter.tags.length === 0 || c.tags.some(ct => this.filter.tags.some(t => t.id === ct.fk_Tag)))
      && (this.filter.memberStati.length === 0 || this.filter.memberStati.some(m => m.id === c.memberStatus.id));
  }
}

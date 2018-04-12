import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../core/model/company';
import { CompanyDAO } from '../../../../core/dao/company.dao';
import { ColumnSortCriteria } from '../../../../core/app-helper/helper-model/column-sort-criteria';
import { SortHelper } from '../../../../core/app-helper/sort-helper';
import { CompanyTransferService } from '../../../../core/app-services/transfer-services/company-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fit-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  public companies: Company[];
  public loading: boolean = true;

  public constructor(private companyDAO: CompanyDAO,
                     private companyTransferState: CompanyTransferService,
                     private router: Router) {
  }

  public async ngOnInit(): Promise<void> {
    this.companies = await this.companyDAO.fetchCompanies();
    this.loading = false;
  }

  public onSorted(criteria: ColumnSortCriteria): void {
    this.companies = this.companies.sort((a, b) => SortHelper.sortHandler(a, b, criteria));
  }

  public routeToCompanyDetails(company: Company): void {
    console.log(company);
    this.companyTransferState.addCompany(company);
    this.router.navigate(['/admin-tool', 'firma', company.id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyTransferService } from '../../../../../core/app-services/transfer-services/company-transfer.service';
import { Company } from '../../../../../core/model/company';
import { CompanyTagService } from '../../../../../core/app-services/company-tag.service';
import { CompanyDAO } from '../../../../../core/dao/company.dao';

@Component({
  selector: 'fit-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  public company: Company;
  public autoCompleteTags: string[] = [];

  public constructor(private activatedRoute: ActivatedRoute,
                     private router: Router,
                     private companyDAO: CompanyDAO,
                     private tagService: CompanyTagService,
                     private companyTransferService: CompanyTransferService) {
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params.id != null) {
          this.company = this.companyTransferService.getCompany(Number(params.id));
          if (this.company == null) {
            this.router.navigate(['/admin-tool', 'firmen']);
          }
        }
      });

    this.autoCompleteTags = this.tagService.getTags().map(t => t.value);
  }

  public getCompanyTagsAsString(): string[] {
    return this.company.tags.map(t => t.value);
  }

  public async updateCompany(): Promise<void> {
    this.company = await this.companyDAO.updateCompany(this.company);
  }
}

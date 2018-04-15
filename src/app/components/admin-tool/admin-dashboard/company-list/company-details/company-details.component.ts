import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyTransferService } from '../../../../../core/app-services/transfer-services/company-transfer.service';
import { Company } from '../../../../../core/model/company';
import { ArrayUtils } from '../../../../../core/utils/array-utils';

@Component({
  selector: 'fit-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  public company: Company;
  public tagInput: string = '';

  public constructor(private activatedRoute: ActivatedRoute,
                     private router: Router,
                     private companyTransferService: CompanyTransferService) {
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        console.log(params);
        if (params.id != null) {
          this.company = this.companyTransferService.getCompany(Number(params.id));
          if (this.company == null) {
            this.router.navigate(['/admin-tool', 'firmen']);
          }
        }
      });
  }

  public addTag(): void {
    this.company.tags.push(this.tagInput);
    this.tagInput = '';
  }

  public removeTag(tag: string): void {
    ArrayUtils.deleteElement(this.company.tags, tag);
  }

}

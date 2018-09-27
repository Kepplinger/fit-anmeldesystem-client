import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyTransferService } from '../../../../../core/app-services/transfer-services/company-transfer.service';
import { Company } from '../../../../../core/model/company';
import { CompanyTagService } from '../../../services/company-tag.service';
import { CompanyDAO } from '../../../../../core/dao/company.dao';
import { Branch } from '../../../../../core/model/branch';
import { BranchDAO } from '../../../../../core/dao/branch.dao';
import { CompanyBranch } from '../../../../../core/model/company-branch';
import { Tag } from '../../../../../core/model/tag';
import { CompanyTag } from '../../../../../core/model/company-tag';
import { getMemberStatusHTML, getOrderedMemberStatus, MemberStatus } from '../../../../../core/model/enums/member-status';
import { ToastrService } from 'ngx-toastr';
import { CompaniesService } from '../../../services/companies.service';
import { BaseOnDeactivateAlertComponent } from '../../../../../core/base-components/base-on-deactivate-alert.component';

@Component({
  selector: 'fit-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent extends BaseOnDeactivateAlertComponent implements OnInit {

  public orderedMemberStatus: MemberStatus[] = getOrderedMemberStatus();
  public company: Company;

  public tags: Tag[] = [];
  public tagFilter: string = '';

  public constructor(private activatedRoute: ActivatedRoute,
                     private router: Router,
                     private toastr: ToastrService,
                     private companyDAO: CompanyDAO,
                     private companiesService: CompaniesService,
                     private tagService: CompanyTagService,
                     private companyTransferService: CompanyTransferService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params.id != null) {
          this.company = this.companyTransferService.getCompany(Number(params.id));
          if (this.company == null) {
            this.router.navigate(['/admin-tool', 'firmen']);
          }
        }
      });

    this.tags = this.tagService.tags.getValue();
    this.tagService.tags.subscribe(t => this.tags = t);
  }

  public async updateCompany(): Promise<void> {
    this.unsavedChangesExist = false;

    this.company = await this.companyDAO.updateCompany(this.company, true);
    this.companiesService.updateCompany(this.company);
    this.companyTransferService.addCompany(this.company);
    this.toastr.success('Die Firma wurde erfolgreich gespeichert.', 'Firma gespeichert!');
  }

  public getFilteredTags(): Tag[] {
    return this.tags.filter(t => t.value.includes(this.tagFilter) && this.company.tags.find(ct => ct.tag.id === t.id) == null);
  }

  public addTagToCompany(tag: Tag): void {
    this.unsavedChangesExist = true;
    this.company.tags.push(new CompanyTag(this.company.id, tag.id, tag));
    this.tagFilter = '';
  }

  public removeTagFromCompany(tag: Tag): void {
    this.unsavedChangesExist = true;
    this.company.tags = this.company.tags.filter(t => t.tag.id !== tag.id);
  }

  public getMemberStatusHTML(status: MemberStatus): string {
    return getMemberStatusHTML(status);
  }

  public changeMemberStatus(status: MemberStatus): void {
    this.unsavedChangesExist = true;
    this.company.memberStatus = status;
  }
}

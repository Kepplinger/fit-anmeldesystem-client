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
  public branches: Branch[] = [];
  public selectedBranches: any[] = [];

  public constructor(private activatedRoute: ActivatedRoute,
                     private router: Router,
                     private toastr: ToastrService,
                     private companyDAO: CompanyDAO,
                     private branchDAO: BranchDAO,
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

    this.tags = this.tagService.getTags();
    this.selectedBranches = (await this.branchDAO.fetchBranches())
      .map(b => {
        return {branch: b, selected: this.isBranchSelected(b)};
      });
  }

  public async updateCompany(): Promise<void> {
    this.unsavedChangesExist = false;
    this.company.branches = this.selectedBranches.filter(b => b.selected)
      .map(b => new CompanyBranch(this.company.id, b.branch.id));

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

  public companyChanged(value: boolean): void {
    this.unsavedChangesExist = value;
  }

  private isBranchSelected(branch: Branch): boolean {
    if (this.company != null && this.company.branches != null && branch != null) {
      return this.company.branches.find(b => b.branch.id === branch.id) != null;
    } else {
      return false;
    }
  }
}

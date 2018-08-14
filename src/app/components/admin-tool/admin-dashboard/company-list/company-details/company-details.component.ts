import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompanyTransferService } from '../../../../../core/app-services/transfer-services/company-transfer.service';
import { Company } from '../../../../../core/model/company';
import { CompanyTagService } from '../../../../../core/app-services/company-tag.service';
import { CompanyDAO } from '../../../../../core/dao/company.dao';
import { Branch } from '../../../../../core/model/branch';
import { BranchDAO } from '../../../../../core/dao/branch.dao';
import { CompanyBranch } from '../../../../../core/model/company-branch';
import { Tag } from '../../../../../core/model/tag';
import { CompanyTag } from '../../../../../core/model/company-tag';
import { getMemberStatusHTML, getOrderedMemberStatus, MemberStatus } from '../../../../../core/model/enums/member-status';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fit-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  public orderedMemberStatus: MemberStatus[] = getOrderedMemberStatus();
  public company: Company;

  public tags: Tag[] = [];
  public tagFilter: string = '';
  public branches: Branch[] = [];
  public selectedBranches: any[] = [];

  public isCompanyChanged: boolean = false;

  public constructor(private activatedRoute: ActivatedRoute,
                     private router: Router,
                     private toastr: ToastrService,
                     private companyDAO: CompanyDAO,
                     private branchDAO: BranchDAO,
                     private tagService: CompanyTagService,
                     private companyTransferService: CompanyTransferService) {
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
    this.isCompanyChanged = false;
    this.company.branches = this.selectedBranches.filter(b => b.selected)
      .map(b => new CompanyBranch(this.company.id, b.branch.id));

    this.company = await this.companyDAO.updateCompany(this.company);
    this.companyTransferService.addCompany(this.company);
    this.toastr.success('Die Firma wurde erfolgreich gespeichert.', 'Firma gespeichert!');
  }

  public getFilteredTags(): Tag[] {
    return this.tags.filter(t => t.value.includes(this.tagFilter) && this.company.tags.find(ct => ct.tag.id === t.id) == null);
  }

  public addTagToCompany(tag: Tag): void {
    this.isCompanyChanged = true;
    this.company.tags.push(new CompanyTag(this.company.id, tag.id, tag));
    this.tagFilter = '';
  }

  public removeTagFromCompany(tag: Tag): void {
    this.isCompanyChanged = true;
    this.company.tags = this.company.tags.filter(t => t.tag.id !== tag.id);
  }

  public getMemberStatusHTML(status: MemberStatus): string {
    return getMemberStatusHTML(status);
  }

  public changeMemberStatus(status: MemberStatus): void {
    this.isCompanyChanged = true;
    this.company.memberStatus = status;
  }

  @HostListener('window:beforeunload', ['$event'])
  public unloadNotification() {
    return !this.isCompanyChanged;
  }

  public async canDeactivate() {
    if (this.isCompanyChanged) {
      return confirm('You have unsaved changes! If you leave, your changes will be lost.');
    } else {
      return true;
    }
  }

  private isBranchSelected(branch: Branch): boolean {
    if (this.company != null && this.company.branches != null) {
      return this.company.branches.find(b => b.branch.id === branch.id) != null;
    } else {
      return false;
    }
  }
}

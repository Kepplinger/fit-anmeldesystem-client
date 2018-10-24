import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Branch } from '../../../../../core/model/branch';
import { BranchDAO } from '../../../../../core/dao/branch.dao';
import { ArrayUtils } from '../../../../../core/utils/array-utils';
import { BaseSettingsChangesComponent } from '../../../../../core/base-components/base-settings-changes.component';

@Component({
  selector: 'fit-settings-branches',
  templateUrl: './settings-branches.component.html',
  styleUrls: ['./settings-branches.component.scss']
})
export class SettingsBranchesComponent extends BaseSettingsChangesComponent implements OnInit {

  public branches: Branch[] = [];
  public archivedBranches: Branch[] = [];

  public branchInput: string = '';

  public isLoading: boolean = false;
  public isArchivedLoading: boolean = false;

  public constructor(private branchDAO: BranchDAO,
                     private toastr: ToastrService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.isArchivedLoading = true;
    this.branches = await this.branchDAO.fetchBranches();
    this.isLoading = false;
    this.archivedBranches = await this.branchDAO.fetchArchivedBranches();
    this.isArchivedLoading = false;
  }

  public addBranch(): void {
    if (this.branches.find(b => b.name === this.branchInput) != null) {
      this.toastr.info('Diese Branche ist bereits vorhanden!', 'Branche hinzufügen');
    } else if (this.archivedBranches.find(t => t.name === this.branchInput) != null) {
      this.toastr.info('Diese Branche ist schon archiviert! Reaktivieren sie diese, oder nennen Sie die neue Branche anders.', 'Branche hinzufügen');
    } else {
      this.branches.push(new Branch(this.branchInput));
      this.branchInput = '';
      this.setUnsavedChanges(true);
    }
  }

  public archiveBranch(branch: Branch): void {
    branch.isArchive = true;
    this.archivedBranches.push(branch);
    ArrayUtils.deleteElement(this.branches, branch);
    this.setUnsavedChanges(true);
  }

  public recoverBranch(branch: Branch): void {
    branch.isArchive = false;
    this.branches.push(branch);
    ArrayUtils.deleteElement(this.archivedBranches, branch);
    this.setUnsavedChanges(true);
  }

  public removeBranch(array: Branch[], branch: Branch): void {
    ArrayUtils.deleteElement(array, branch);
    this.setUnsavedChanges(true);
  }

  public async updateBranches(): Promise<void> {
    let branches: Branch[] = await this.branchDAO.updateBranches([...this.branches, ...this.archivedBranches]);

    this.branches = branches.filter(t => !t.isArchive);
    this.archivedBranches = branches.filter(t => t.isArchive);
    this.toastr.success('Die Branchen wurden erfolgreich gespeichert!', 'Update erfolgreich!');
    this.setUnsavedChanges(false);
  }
}

import { Component, OnInit } from '@angular/core';
import { BaseSettingsChangesComponent } from '../../../../../core/base-components/base-settings-changes.component';
import { MemberStatus } from '../../../../../core/model/member-status';
import { MemberStatusDAO } from '../../../../../core/dao/member-status.dao';
import { ArrayUtils } from '../../../../../core/utils/array-utils';
import { ToastrService } from 'ngx-toastr';
import { tokenReference } from '@angular/compiler';

@Component({
  selector: 'fit-settings-member-status',
  templateUrl: './settings-member-status.component.html',
  styleUrls: ['./settings-member-status.component.scss']
})
export class SettingsMemberStatusComponent extends BaseSettingsChangesComponent implements OnInit {

  public memberStati: MemberStatus[] = [];
  public archivedMemberStati: MemberStatus[] = [];

  public memberStatusName: string = '';
  public memberStatusPrice: number = null;

  public isLoading: boolean = false;
  public isArchivedLoading: boolean = false;

  public constructor(private memberStatusDAO: MemberStatusDAO,
                     private toastr: ToastrService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.isArchivedLoading = true;
    this.memberStati = await this.memberStatusDAO.fetchMemberStati();
    this.isLoading = false;
    this.archivedMemberStati = await this.memberStatusDAO.fetchArchivedMemberStati();
    this.isArchivedLoading = false;
  }

  public addMemberStatus(): void {
    if (this.memberStati.find(b => b.name === this.memberStatusName) != null) {
      this.toastr.info('Dieser MemberStatus ist bereits vorhanden!', 'MemberStatus hinzufügen');
    } else if (this.archivedMemberStati.find(t => t.name === this.memberStatusName) != null) {
      this.toastr.info('Dieser MemberStatus ist schon archiviert! Reaktivieren sie diesen, oder nennen Sie die neuen MemberStatus anders.', 'MemberStatus hinzufügen');
    } else {
      this.memberStati.push(new MemberStatus(this.memberStatusName, this.memberStatusPrice));
      this.memberStatusName = '';
      this.memberStatusPrice = null;
      this.setUnsavedChanges(true);
      this.sortTags();
    }
  }

  public archiveMemberStatus(memberStatus: MemberStatus): void {
    memberStatus.isArchive = true;
    this.archivedMemberStati.push(memberStatus);
    ArrayUtils.deleteElement(this.memberStati, memberStatus);
    this.setUnsavedChanges(true);
  }

  public recoverMemberStatus(memberStatus: MemberStatus): void {
    memberStatus.isArchive = false;
    this.memberStati.push(memberStatus);
    ArrayUtils.deleteElement(this.archivedMemberStati, memberStatus);
    this.setUnsavedChanges(true);
    this.sortTags();
  }

  public removeMemberStatus(array: MemberStatus[], memberStatus: MemberStatus): void {
    ArrayUtils.deleteElement(array, memberStatus);
    this.setUnsavedChanges(true);
  }

  public async updateMemberStati(): Promise<void> {
    let memberStati: MemberStatus[] = await this.memberStatusDAO.updateMemberStati([...this.memberStati, ...this.archivedMemberStati]);

    this.memberStati = memberStati.filter(t => !t.isArchive);
    this.archivedMemberStati = memberStati.filter(t => t.isArchive);
    this.toastr.success('Die MemberStatusen wurden erfolgreich gespeichert!', 'Update erfolgreich!');
    this.setUnsavedChanges(false);
  }

  private sortTags(): void {
    this.memberStati = this.memberStati.sort((a: MemberStatus, b: MemberStatus) => a.defaultPrice - b.defaultPrice);
  }
}

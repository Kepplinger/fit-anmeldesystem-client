import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LockPageDAO } from '../../../../../../core/dao/lock-page.dao';
import { LockPage } from '../../../../../../core/model/lock-page';
import { BaseSettingsChangesComponent } from '../../../../../../core/base-components/base-settings-changes.component';
import { BaseOnDeactivateAlertComponent } from '../../../../../../core/base-components/base-on-deactivate-alert.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fit-edit-locked-page',
  templateUrl: './edit-fit-locked-page.component.html',
  styleUrls: ['./edit-fit-locked-page.component.scss']
})
export class EditFitLockedPageComponent extends BaseOnDeactivateAlertComponent implements OnInit {

  public isExpiredLockMode: boolean = false;
  public lockPage: LockPage;

  public isLoading: boolean = false;
  public isSaving: boolean = false;

  public constructor(private route: ActivatedRoute,
                     private toastr: ToastrService,
                     private lockPageDAO: LockPageDAO) {
    super();
    this.addSub(this.route.params.subscribe(params => {
      let type: string = params['type'];

      if (type === 'bevor') {
        this.isExpiredLockMode = false;
      } else if (type === 'danach') {
        this.isExpiredLockMode = true;
      }
    }));
  }

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.lockPage = await this.lockPageDAO.getLockPage();
    this.isLoading = false;
  }

  public htmlChanged(): void {
    this.unsavedChangesExist = true;
  }

  public async updateLockPage(): Promise<void> {
    this.unsavedChangesExist = false;
    this.isSaving = true;
    await this.lockPageDAO.updateLockPage(this.lockPage);
    this.isSaving = false;
    this.toastr.success('Die Seite wurde gespeichert.', 'Speichern erfolgreich!');
  }
}

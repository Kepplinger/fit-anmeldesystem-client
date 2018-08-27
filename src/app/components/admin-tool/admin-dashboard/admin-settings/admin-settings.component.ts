import { Component, OnInit } from '@angular/core';
import { AdminSettingPage } from '../../../../core/model/enums/admin-setting-page';
import { Admin } from '../../../../core/model/admin';

@Component({
  selector: 'fit-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  // for template usage
  public AdminSettingPage = AdminSettingPage;

  public selectedAdminSettingPage: AdminSettingPage = AdminSettingPage.EmailSMTP;

  public constructor() {
  }

  public ngOnInit(): void {
    let adminSettingPage = sessionStorage.getItem('selectedAdminSettingPage');

    if (adminSettingPage != null) {
      this.selectedAdminSettingPage = adminSettingPage as AdminSettingPage;
    }
  }

  public setAdminSettingPage(adminSettingPage: AdminSettingPage): void {
    this.selectedAdminSettingPage = adminSettingPage;
    sessionStorage.setItem('selectedAdminSettingPage', adminSettingPage);
  }

  public isSelectedAdminSettingPage(adminSettingPage: AdminSettingPage): boolean {
    return this.selectedAdminSettingPage === adminSettingPage;
  }
}

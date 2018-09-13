import { Component, OnInit } from '@angular/core';
import { getSettingTabs, SettingTab } from '../../../../core/model/enums/setting-tab';
import { BaseOnDeactivateAlertComponent } from '../../../../core/base-components/base-on-deactivate-alert.component';

@Component({
  selector: 'fit-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent extends BaseOnDeactivateAlertComponent implements OnInit {

  // for template usage
  public SettingTab = SettingTab;

  public selectedSettingTab: SettingTab = SettingTab.EmailSMTP;
  public settingTabs: SettingTabWithChanges[];

  public constructor() {
    super();
    this.settingTabs = getSettingTabs().map(st => {
      return { tab: st, hasChanges: false } as SettingTabWithChanges;
    });
  }

  public ngOnInit(): void {
    let adminSettingPage = sessionStorage.getItem('selectedSettingTab');

    if (adminSettingPage != null) {
      this.selectedSettingTab = adminSettingPage as SettingTab;
    }
  }

  public setSelectedSettingTab(settingTab: SettingTab): void {
    this.selectedSettingTab = settingTab;
    sessionStorage.setItem('selectedSettingTab', settingTab);
  }

  public isSelectedSettingTab(settingTab: SettingTab): boolean {
    return this.selectedSettingTab === settingTab;
  }

  public setChangesOnTab(settingsTab: SettingTab, hasChanges: boolean): void {
    this.settingTabs.find(s => s.tab === settingsTab).hasChanges = hasChanges;
    this.unsavedChangesExist = this.settingTabs.some(st => st.hasChanges);
  }

  public hasSettingTabChanges(settingsTab: SettingTab): boolean {
    return this.settingTabs.find(s => s.tab === settingsTab).hasChanges;
  }
}

interface SettingTabWithChanges {
  tab: SettingTab;
  hasChanges: boolean;
}

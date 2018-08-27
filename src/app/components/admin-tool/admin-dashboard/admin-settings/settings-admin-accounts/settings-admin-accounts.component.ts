import { Component, OnInit } from '@angular/core';
import { BaseSettingsChangesComponent } from '../../../../../core/base-components/base-settings-changes.component';

@Component({
  selector: 'fit-settings-admin-accounts',
  templateUrl: './settings-admin-accounts.component.html',
  styleUrls: ['./settings-admin-accounts.component.scss']
})
export class SettingsAdminAccountsComponent extends BaseSettingsChangesComponent implements OnInit {

  public constructor() {
    super();
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { BaseSettingsChangesComponent } from '../../../../../core/base-components/base-settings-changes.component';

@Component({
  selector: 'fit-settings-branches',
  templateUrl: './settings-branches.component.html',
  styleUrls: ['./settings-branches.component.scss']
})
export class SettingsBranchesComponent extends BaseSettingsChangesComponent implements OnInit {

  public constructor() {
    super();
  }

  ngOnInit() {
  }

}

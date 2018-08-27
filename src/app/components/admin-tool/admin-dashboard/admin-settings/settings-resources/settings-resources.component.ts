import { Component, OnInit } from '@angular/core';
import { BaseSettingsChangesComponent } from '../../../../../core/base-components/base-settings-changes.component';

@Component({
  selector: 'fit-settings-resources',
  templateUrl: './settings-resources.component.html',
  styleUrls: ['./settings-resources.component.scss']
})
export class SettingsResourcesComponent extends BaseSettingsChangesComponent implements OnInit {

  public constructor() {
    super();
  }

  ngOnInit() {
  }

}

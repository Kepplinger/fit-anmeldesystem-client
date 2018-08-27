import { Component, OnInit } from '@angular/core';
import { BaseSettingsChangesComponent } from '../../../../../core/base-components/base-settings-changes.component';

@Component({
  selector: 'fit-settings-email-smtp',
  templateUrl: './settings-email-smtp.component.html',
  styleUrls: ['./settings-email-smtp.component.scss']
})
export class SettingsEmailSmtpComponent extends BaseSettingsChangesComponent implements OnInit {

  public constructor() {
    super();
  }

  ngOnInit() {
  }

}

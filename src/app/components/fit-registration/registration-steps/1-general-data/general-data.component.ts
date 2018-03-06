import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayedValue } from '../../../../core/app-helper/helper-model/displayed-value';
import { AppConfig } from '../../../../core/app-config/app-config.service';

@Component({
  selector: 'fit-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent {

  @Input()
  public isVisible: boolean = false;

  @Input()
  public stepFormGroup: FormGroup;

  public genders: DisplayedValue[];

  public constructor(private appConfig: AppConfig) {
    this.genders = appConfig.genders;
  }
}

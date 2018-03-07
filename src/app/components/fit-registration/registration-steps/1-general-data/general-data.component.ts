import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayedValue } from '../../../../core/app-helper/helper-model/displayed-value';
import { AppConfig } from '../../../../core/app-config/app-config.service';
import { ModalWindowService } from '../../../../core/app-services/modal-window.service';
import { Router } from '@angular/router';

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

  public constructor(private appConfig: AppConfig,
                     private router: Router,
                     private modalWindowService: ModalWindowService) {
    this.genders = appConfig.genders;
  }

  public async navigateToAccount(): Promise<void> {
    let result: boolean = await this.modalWindowService.confirm('Stammdaten bearbeiten',
      'Wenn Sie fortfahren, wird Ihre derzeitige FIT Anmeldung abgebrochen. Wollen Sie wirklich fortfahren?',
      {
        closableByDimmer: false,
        movable: false,
        labels: {ok: 'Fortfahren', cancel: 'Abbrechen'}
      });

    if (result) {
      this.router.navigate(['/konto']);
    }
  }
}

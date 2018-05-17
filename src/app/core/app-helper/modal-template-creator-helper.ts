import { FormGroup } from '@angular/forms';

export class ModalTemplateCreatorHelper {

  public static getRegistrationWarning(formGroup: FormGroup): string {

    if (formGroup.get('packagesAndLocation').value.location == null) {
      console.log('hallo');
    }

    return `
    <h1>Hallo</h1>
    `;
  }

  public static getNextStepWarning(): string {
    return `
    <h5>Nicht alle Pflichtfelder wurden korrekt ausgefüllt!</h5>
    <p class="text-justify">Sind Sie sicher dass Sie fortfahren möchten?</p>`;
  }

  public static getBasicModalOptions(ok: string, cancel: string): any {
    return {
      closableByDimmer: false,
      movable: false,
      labels: {ok: ok, cancel: cancel}
    };
  }

}

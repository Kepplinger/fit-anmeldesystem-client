import { FormGroup } from '@angular/forms';

export class ModalTemplateCreatorHelper {

  public static getRegistrationWarningModalContent(formGroup: FormGroup): string {

    if (formGroup.get('packagesAndLocation').value.location == null) {
      console.log('hallo');
    }

    return `
    <h1>Hallo</h1>
    `;
  }

}

import { FormGroup, ValidationErrors } from '@angular/forms';

export class FormValidationHelper {
  public static isRequired(formName: string, formGroup: FormGroup): boolean {
    let errors = formGroup.controls[formName].errors;

    if (errors != null) {
      return errors.required != null
    } else {
      return false;
    }
  }

  public static hasError(formName: string, formGroup: FormGroup): ValidationErrors {
    return formGroup.controls[formName].errors;
  }

  public static isTouched(formName: string, formGroup: FormGroup): boolean {
    return formGroup.controls[formName].touched;
  }
}

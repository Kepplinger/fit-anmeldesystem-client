import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormValidationHelper {
  public static isEmpty(formName: string, formGroup: FormGroup): boolean {
    let errors = formGroup.controls[formName].errors;

    if (errors != null) {
      return errors.required != null
    } else {
      return false;
    }
  }

  public static isNoEmail(formName: string, formGroup: FormGroup): boolean {
    let errors = formGroup.controls[formName].errors;

    if (errors != null) {
      return errors.email != null
    } else {
      return false;
    }
  }

  public static hasError(formName: string, formGroup: FormGroup): ValidationErrors {
    return formGroup.get(formName).errors;
  }

  public static isTouched(formName: string, formGroup: FormGroup): boolean {
    return formGroup.get(formName).touched;
  }

  public static validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}

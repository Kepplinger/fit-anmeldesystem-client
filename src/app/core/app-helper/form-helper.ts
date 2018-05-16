import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormHelper {
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

  public static isTooLong(formName: string, formGroup: FormGroup): boolean {
    let errors = formGroup.controls[formName].errors;

    if (errors != null) {
      return errors.maxlength != null
    } else {
      return false;
    }
  }

  public static isDescriptionTooLong(formName: string, formGroup: FormGroup): boolean {
    let errors = formGroup.controls[formName].errors;

    if (errors != null) {
      return errors.companyDescription != null
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

  /**
   * Marks every FormGroup as touched, to display its errors
   * @param {FormGroup} formGroup
   */
  public static touchAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.touchAllFormFields(control);
      }
    });
  }

  public static getErrorCount(formGroup: FormGroup): number {
    let errorCount: number = 0;

    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (!control.valid) {
          errorCount++;
        }
      } else if (control instanceof FormGroup) {
        errorCount += this.getErrorCount(control);
      }
    });

    return errorCount;
  }
}

import { Form, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormHelper {
  public static isEmpty(formName: string, formGroup: FormGroup): boolean {
    let errors: ValidationErrors = this.getValidationErrors(formName, formGroup);

    if (errors != null) {
      return errors.required != null;
    } else {
      return false;
    }
  }

  public static isNoEmail(formName: string, formGroup: FormGroup): boolean {
    let errors: ValidationErrors = this.getValidationErrors(formName, formGroup);

    if (errors != null) {
      return errors.email != null;
    } else {
      return false;
    }
  }

  public static isTooLong(formName: string, formGroup: FormGroup): boolean {
    let errors: ValidationErrors = this.getValidationErrors(formName, formGroup);

    if (errors != null) {
      return errors.maxlength != null;
    } else {
      return false;
    }
  }

  public static isTooShort(formName: string, formGroup: FormGroup): boolean {
    let errors: ValidationErrors = this.getValidationErrors(formName, formGroup);

    if (errors != null) {
      return errors.minlength != null;
    } else {
      return false;
    }
  }

  public static isNotMatching(formName: string, formGroup: FormGroup): boolean {
    let errors: ValidationErrors = this.getValidationErrors(formName, formGroup);

    if (errors != null) {
      return errors.matchOther != null;
    } else {
      return false;
    }
  }

  public static isDescriptionTooLong(formName: string, formGroup: FormGroup): boolean {
    let errors: ValidationErrors = this.getValidationErrors(formName, formGroup);

    if (errors != null) {
      return errors.companyDescription != null;
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
    if (formGroup != null && formGroup.controls != null) {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
          this.touchAllFormFields(control);
        } else if (control instanceof FormArray) {
          control.controls.forEach((c: FormGroup) => this.touchAllFormFields(c));
        }
      });
    }
  }

  public static getErrorCount(formGroup: FormGroup): number {
    let errorCount: number = 0;

    if (formGroup != null && formGroup.controls != null) {
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
    }

    return errorCount;
  }

  private static getValidationErrors(formName: string, formGroup: FormGroup): ValidationErrors {
    return formGroup.controls[formName].errors;
  }
}

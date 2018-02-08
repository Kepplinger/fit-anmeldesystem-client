import {FormGroup, ValidationErrors} from '@angular/forms';

export class FormValidationHelper{
  public static isRequired(formName: string,formGroup: FormGroup): boolean {
    return formGroup.controls[formName].errors.required;
  }

  public static hasError(formName:string, formGroup: FormGroup):ValidationErrors{
    return formGroup.controls[formName].errors;
  }

  public static isHoovered(formName:string, formGroup: FormGroup):boolean{
    return !formGroup.controls[formName].pristine;
  }
}

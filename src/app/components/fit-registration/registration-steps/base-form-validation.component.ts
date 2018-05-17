import { FormHelper } from '../../../core/app-helper/form-helper';
import { FormArray, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

export abstract class BaseFormValidationComponent {

  public abstract stepFormGroup: FormGroup;

  public abstract onInput: EventEmitter<void>;

  public isArrayFieldEmpty(formArray: string, index: number, formName: string): boolean {
    let formGroup: FormGroup = (this.stepFormGroup.controls[formArray] as FormArray).at(0) as FormGroup;
    console.log(formGroup);
    return FormHelper.isEmpty(formName, formGroup) && this.isInvalid(formName, formGroup);
  }

  public isEmpty(formName: string): boolean {
    return FormHelper.isEmpty(formName, this.stepFormGroup) && this.isInvalid(formName);
  }

  public isNoMail(formName: string): boolean {
    return FormHelper.isNoEmail(formName, this.stepFormGroup) && this.isInvalid(formName);
  }

  public isDescriptionTooLong(formName: string): boolean {
    return FormHelper.isDescriptionTooLong(formName, this.stepFormGroup);
  }

  public isInvalid(formName: string, formGroup: FormGroup = this.stepFormGroup): boolean {
    return FormHelper.hasError(formName, formGroup) != null &&
      FormHelper.isTouched(formName, formGroup);
  }

  public onInputChanged(): void {
    this.onInput.emit();
  }
}

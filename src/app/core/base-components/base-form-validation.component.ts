import { FormHelper } from '../app-helper/form-helper';
import { FormArray, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { BaseSubscriptionComponent } from './base-subscription.component';

export abstract class BaseFormValidationComponent extends BaseSubscriptionComponent {

  public abstract formGroup: FormGroup;

  public onInput: EventEmitter<void>;

  public isArrayFieldEmpty(formArray: string, index: number, formName: string): boolean {
    let formGroup: FormGroup = this.getArrayFormGroup(formArray, index);
    return FormHelper.isEmpty(formName, formGroup) && this.isInvalid(formName, formGroup);
  }

  public isArrayFieldNoMail(formArray: string, index: number, formName: string): boolean {
    let formGroup: FormGroup = this.getArrayFormGroup(formArray, index);
    return FormHelper.isNoEmail(formName, formGroup) && this.isInvalid(formName, formGroup);
  }

  public isArrayFieldInvalid(formArray: string, index: number, formName: string): boolean {
    let formGroup: FormGroup = this.getArrayFormGroup(formArray, index);

    return FormHelper.hasError(formName, formGroup) != null &&
      FormHelper.isTouched(formName, formGroup);
  }

  public isEmpty(formName: string): boolean {
    return FormHelper.isEmpty(formName, this.formGroup) && this.isInvalid(formName);
  }

  public isNoMail(formName: string): boolean {
    return FormHelper.isNoEmail(formName, this.formGroup) && this.isInvalid(formName);
  }

  public isDescriptionTooLong(formName: string): boolean {
    return FormHelper.isDescriptionTooLong(formName, this.formGroup);
  }

  public isNotMatching(formName: string): boolean {
    return FormHelper.isNotMatching(formName, this.formGroup) && this.isInvalid(formName);
  }

  public isTooShort(formName: string): boolean {
    return FormHelper.isTooShort(formName, this.formGroup) && this.isInvalid(formName);
  }

  public isTooLong(formName: string): boolean {
    return FormHelper.isTooLong(formName, this.formGroup) && this.isInvalid(formName);
  }

  public isInvalid(formName: string, formGroup: FormGroup = this.formGroup): boolean {
    return FormHelper.hasError(formName, formGroup) != null &&
      FormHelper.isTouched(formName, formGroup);
  }

  public onInputChanged(): void {
    this.onInput.emit();
  }

  private getArrayFormGroup(formArray: string, index: number): FormGroup {
    return (this.formGroup.controls[formArray] as FormArray).at(index) as FormGroup;
  }
}

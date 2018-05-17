import { FormHelper } from '../../../core/app-helper/form-helper';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

export abstract class BaseFormValidationComponent {

  public abstract stepFormGroup: FormGroup;

  public abstract onInput: EventEmitter<void>;

  public isEmpty(formName: string): boolean {
    return FormHelper.isEmpty(formName, this.stepFormGroup) && this.isInvalid(formName);
  }

  public isNoMail(formName: string): boolean {
    return FormHelper.isNoEmail(formName, this.stepFormGroup) && this.isInvalid(formName);
  }

  public isDescriptionTooLong(formName: string): boolean {
    return FormHelper.isDescriptionTooLong(formName, this.stepFormGroup);
  }

  public isInvalid(formName: string): boolean {
    return FormHelper.hasError(formName, this.stepFormGroup) != null &&
      FormHelper.isTouched(formName, this.stepFormGroup);
  }

  public onInputChanged(): void {
    this.onInput.emit();
  }
}

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PickedFile } from '../../../../libs/file-picker/picked-file';
import { FilePickerError } from '../../../../libs/file-picker/file-picker-error';
import { FormValidationHelper } from '../../../../core/app-helper/form-validation-helper';

@Component({
  selector: 'fit-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent {

  @Input()
  public isVisible: boolean = false;

  @Input()
  public stepFormGroup: FormGroup;

  public logo: PickedFile;
  public isDrag: boolean = false;

  public filePicked(file: PickedFile | FilePickerError): void {
    if (file instanceof PickedFile) {
      this.logo = file;
      this.stepFormGroup.value.logo = this.logo.dataURL;
    } else if (file === FilePickerError.FileTooBig) {
      console.log('too big');
    } else if (file === FilePickerError.InvalidFileType) {
      console.log('invalid file type');
    } else if (file === FilePickerError.UndefinedInput) {
      console.log('undefined input');
    }
  }

  public isEmpty(formName: string): boolean {
    return FormValidationHelper.isEmpty(formName, this.stepFormGroup) && this.isInvalid(formName);
  }

  public isNoMail(formName: string): boolean {
    return FormValidationHelper.isNoEmail(formName, this.stepFormGroup) && this.isInvalid(formName);
  }

  public isInvalid(formName: string): boolean {
    return FormValidationHelper.hasError(formName, this.stepFormGroup) != null &&
      FormValidationHelper.isTouched(formName, this.stepFormGroup);
  }
}

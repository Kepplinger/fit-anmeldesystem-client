import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PickedFile } from '../../../../libs/file-picker/picked-file';
import { FilePickerError } from '../../../../libs/file-picker/file-picker-error';


@Component({
  selector: 'fit-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent implements OnInit {

  @Input()
  public fitFormGroup: FormGroup;

  @Input()
  public fitFormGroupChange = new EventEmitter<FormGroup>();

  public logo: PickedFile;
  public isDrag: boolean = false;

  public constructor() {
  }

  public ngOnInit() {
  }

  public formChanged() {
    this.fitFormGroupChange.emit(this.fitFormGroup);
  }

  public filePicked(file: PickedFile | FilePickerError): void {

    if (file instanceof PickedFile) {
      this.logo = file;
      this.fitFormGroup.controls['logo'].setValue(this.logo.dataURL);
    } else if (file === FilePickerError.FileTooBig) {
      console.log('too big');
    } else if (file === FilePickerError.InvalidFileType) {
      console.log('invalid file type');
    } else if (file === FilePickerError.UndefinedInput) {
      console.log('undefined input');
    }
  }

}

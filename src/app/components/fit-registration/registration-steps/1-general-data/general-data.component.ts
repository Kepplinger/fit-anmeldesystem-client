import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PickedFile } from '../../../../libs/file-picker/picked-file';


@Component({
  selector: 'fit-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent implements OnInit {

  @Input()
  public fitFormGroup: FormGroup;
  public logo: PickedFile;

  @Input()
  public fitFormGroupChange = new EventEmitter<FormGroup>();

  public constructor() {
  }

  public ngOnInit() {
    console.log(this.fitFormGroup);
  }

  public formChanged() {
    this.fitFormGroupChange.emit(this.fitFormGroup);
  }

  public filePicked(file: PickedFile): void {
    if (file.size <= 2000000) {
      this.logo = file;
      this.fitFormGroup.controls['logo'].setValue(this.logo.dataURL);
    } else {
      console.log('too big');
    }
  }

}

import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  public constructor() {
  }

  public ngOnInit() {
    console.log(this.fitFormGroup);
  }

  public formChanged() {
    this.fitFormGroupChange.emit(this.fitFormGroup);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fit-detailed-data',
  templateUrl: './detailed-data.component.html',
  styleUrls: ['./detailed-data.component.scss']
})
export class DetailedDataComponent implements OnInit {

  @Input()
  public fitFormGroup: FormGroup;

  public constructor() {
  }

  public ngOnInit() {
  }

}

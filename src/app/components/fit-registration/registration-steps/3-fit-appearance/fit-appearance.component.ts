import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fit-fit-appearance',
  templateUrl: './fit-appearance.component.html',
  styleUrls: ['./fit-appearance.component.scss']
})
export class FitAppearanceComponent implements OnInit {

  @Input()
  public fitFormGroup: FormGroup;

  public constructor() {
  }

  public ngOnInit() {
  }

}

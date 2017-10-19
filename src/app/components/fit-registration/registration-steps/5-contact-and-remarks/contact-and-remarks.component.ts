import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fit-contact-and-remarks',
  templateUrl: './contact-and-remarks.component.html',
  styleUrls: ['./contact-and-remarks.component.scss']
})
export class ContactAndRemarksComponent implements OnInit {

  @Input()
  public fitFormGroup: FormGroup;

  public constructor() {
  }

  public ngOnInit() {
  }

}

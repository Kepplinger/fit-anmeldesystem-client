import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public registrationAllowed: boolean = true;

  public constructor() {
  }

  public ngOnInit() {
  }

}

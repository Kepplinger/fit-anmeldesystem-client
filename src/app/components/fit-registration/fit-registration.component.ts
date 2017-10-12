import { Component, OnInit } from '@angular/core';
import { FitRegistrationStep } from '../../core/model/enums/fit-registration-step';

@Component({
  selector: 'fit-fit-registration',
  templateUrl: './fit-registration.component.html',
  styleUrls: ['./fit-registration.component.scss']
})
export class FitRegistrationComponent implements OnInit {

  public currentPage: FitRegistrationStep;

  public constructor() {
    this.currentPage = 1;
  }

  public ngOnInit() {
  }

  public setCurrentPage(page: number) {
    this.currentPage = page;
  }

  public nextPage() {
    this.currentPage += 1;
  }

  public previousPage() {
    this.currentPage -= 1;
  }

  public submitForm(): void {


  }
}

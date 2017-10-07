import { Component, OnInit } from '@angular/core';
import { FitRegistrationStep } from '../../core/model/enums/fit-registration-step';

@Component({
  selector: 'fit-fit-registration',
  templateUrl: './fit-registration.component.html',
  styleUrls: ['./fit-registration.component.scss']
})
export class FitRegistrationComponent implements OnInit {

  public currentPage: FitRegistrationStep;
  public progressValue: string;

  public constructor() {
    this.currentPage = 1;
    this.progressValue = '0%'
  }

  public ngOnInit() {
  }

  public setCurrentPage(page: number) {
    this.currentPage = page;
    this.progressValue = page / 4 * 100 + '%';
  }

  public nextPage() {
    this.currentPage += 1;
  }

  public previousPage() {
    this.currentPage -= 1;
  }
}

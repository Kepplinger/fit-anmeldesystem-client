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
  public unMuteTwo(){
    var container = document.getElementById("stepTwo").className = "step-container mx-4 my-2";
  }
  public unMuteThree(){
    var container = document.getElementById("stepThree").className = "step-container mx-4 my-2";
  }
  public unMuteFour(){
    var container = document.getElementById("stepFour").className = "step-container mx-4 my-2";
  }

  public previousPage() {
    this.currentPage -= 1;
  }
}

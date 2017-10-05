import { Component, OnInit } from '@angular/core';
import {FitRegistrationStep} from '../../core/model/enums/fit-registration-step';

@Component({
  selector: "fit-fit-registration",
  templateUrl: './fit-registration.component.html',
  styleUrls: ['./fit-registration.component.scss']
})
export class FitRegistrationComponent implements OnInit {

  public currentPage: FitRegistrationStep;

  constructor() { }

  ngOnInit() {
    this.currentPage = 1;

  }

  public setCurrentPage(id:number){
    this.currentPage=id;
  }

  public nextPage(){
    this.currentPage+=1;
  }
  public previousPage(){
    this.currentPage-=1;
  }

}

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
    var progbar = document.getElementById("progBar").style.width="25%";

  }


  public setCurrentPage(id:number){
    this.currentPage=id;

    if(this.currentPage==1) {
      this.setProgress('25%');
    }
    if(this.currentPage==2){
      this.setProgress('50%');
      this.unMuteTwo();
    }
    if(this.currentPage==3){
      this.setProgress('75%');
      this.unMuteThree();
    }
    if(this.currentPage==4){
      this.setProgress('100%');
      this.unMuteFour();
    }

  }

  public nextPage(){
    this.currentPage+=1;
  }
  public previousPage(){
    this.currentPage-=1;
  }

  public setProgress(amount: string)
  {
    var progbar = document.getElementById("progBar").style.width=amount;

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

}

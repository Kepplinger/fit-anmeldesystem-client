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
    var progbar = document.getElementById("progBar").style.width="0%";

  }


  public setCurrentPage(id:number){
    this.currentPage=id;

    if(this.currentPage==1) {
      this.setProgress('25%');
    }
    if(this.currentPage==2){
      this.setProgress('50%');
    }
    if(this.currentPage==3){
      this.setProgress('75%');
    }
    if(this.currentPage==4){
      this.setProgress('100%');
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

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fit-contact-and-remarks',
  templateUrl: './contact-and-remarks.component.html',
  styleUrls: ['./contact-and-remarks.component.scss']
})
export class ContactAndRemarksComponent implements OnInit {

  public agbChecked: boolean;

  constructor() { }

  ngOnInit() {
    this.agbChecked=false;
  }

  public checkAgb(){
    if(this.agbChecked==true){
      this.agbChecked=false;
    }
    else {
      this.agbChecked=true;
    }
  }

}

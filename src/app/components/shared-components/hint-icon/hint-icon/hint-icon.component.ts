import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'fit-hint-icon',
  templateUrl: './hint-icon.component.html',
  styleUrls: ['./hint-icon.component.scss']
})
export class HintIconComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('[data-toggle="popover"]').popover({
      placement : 'right',
      trigger : 'hover'
    });

  }


}

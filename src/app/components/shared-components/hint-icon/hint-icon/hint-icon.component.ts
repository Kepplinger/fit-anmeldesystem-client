import {Component, Input, OnInit} from '@angular/core';
declare let $;
@Component({
  selector: 'fit-hint-icon',
  templateUrl: './hint-icon.component.html',
  styleUrls: ['./hint-icon.component.scss']
})
export class HintIconComponent implements OnInit {

  @Input()
  public message: string;

  constructor() { }

  ngOnInit() {
    $('[data-toggle="popover"]').popover({
      placement : 'right',
      trigger : 'hover',
      content: this.message
    });
  }




}

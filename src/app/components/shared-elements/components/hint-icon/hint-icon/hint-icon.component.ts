import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

declare let $: any;

@Component({
  selector: 'fit-hint-icon',
  templateUrl: './hint-icon.component.html',
  styleUrls: ['./hint-icon.component.scss']
})
export class HintIconComponent implements OnInit {

  @ViewChild('hint')
  public el: ElementRef;

  @Input()
  public message: string;

  public constructor() {
  }

  public ngOnInit(): void {
    $(this.el.nativeElement).popover({
      placement: 'right',
      trigger: 'hover',
      content: this.message
    });
  }
}

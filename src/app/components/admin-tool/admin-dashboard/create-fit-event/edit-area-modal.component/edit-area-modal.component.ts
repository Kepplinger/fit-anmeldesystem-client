import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Area } from '../../../../../core/model/area';

declare let $: any;

@Component({
  selector: 'fit-edit-area-modal',
  templateUrl: './edit-area-modal.component.html',
  styleUrls: ['./edit-area-modal.component.scss'],
})
export class EditAreaModalComponent {

  @ViewChild('areaBounds')
  public imgContainer: ElementRef;

  @Input()
  public area: Area;

  public onDragEnd(event: any) {
    console.log($(event).position().left);
  }

}

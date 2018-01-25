import { Component, Input } from '@angular/core';
import { Area } from '../../../../../core/model/area';

@Component({
  selector: 'fit-edit-area-modal',
  templateUrl: './edit-area-modal.component.html',
  styleUrls: ['./edit-area-modal.component.scss'],
})
export class EditAreaModalComponent {

  @Input()
  public area: Area;

}

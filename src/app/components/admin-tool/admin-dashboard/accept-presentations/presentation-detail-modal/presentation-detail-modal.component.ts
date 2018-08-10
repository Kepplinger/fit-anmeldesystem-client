import { Component, Input } from '@angular/core';
import { CompanyPresentation } from '../../../../../core/app-helper/helper-model/company-presentation';

@Component({
  selector: 'fit-presentation-detail-modal',
  templateUrl: './presentation-detail-modal.component.html',
  styleUrls: ['./presentation-detail-modal.component.scss']
})
export class PresentationDetailModalComponent {

  @Input()
  public presentation: CompanyPresentation;

  public constructor() {
  }

}

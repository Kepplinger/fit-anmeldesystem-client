import { Component, Input } from '@angular/core';
import { Company } from '../../../../../core/model/company';
import { Email } from '../../../../../core/model/email';

@Component({
  selector: 'fit-send-custom-mail-modal',
  templateUrl: './send-custom-mail-modal.component.html',
  styleUrls: ['./send-custom-mail-modal.component.scss']
})
export class SendCustomMailModalComponent {

  @Input()
  public companies: Company[] = [];

  public customMail: Email = new Email();

  public quillEditor: any;
  public currentIndex: number = 0;
}

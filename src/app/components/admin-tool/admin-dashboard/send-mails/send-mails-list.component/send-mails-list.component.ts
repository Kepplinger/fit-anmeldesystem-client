import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from '../../../../../core/model/company';

@Component({
  selector: 'fit-send-mails-list',
  templateUrl: './send-mails-list.component.html',
  styleUrls: ['./send-mails-list.component.scss']
})
export class SendMailsListComponent {

  @Input()
  public companies: Company[] = [];

  @Output()
  public onOpenMailSelection: EventEmitter<Company[]> = new EventEmitter();

  public openMailSelection(companies: Company[]): void {
    this.onOpenMailSelection.emit(companies);
  }
}

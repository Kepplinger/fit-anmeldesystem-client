import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Company } from '../../../../../core/model/company';
import { FitEmails } from '../../../../../core/model/enums/fit-emails';
import { Event } from '../../../../../core/model/event';
import { EventService } from '../../../../../core/app-services/event.service';
import { EmailDAO } from '../../../../../core/dao/email.dao';
import { ToastrService } from 'ngx-toastr';
import { ModalWindowService } from '../../../../../core/app-services/modal-window.service';
import { ModalTemplateCreatorHelper } from '../../../../../core/app-helper/modal-template-creator-helper';
import { BaseSubscriptionComponent } from '../../../../../core/base-components/base-subscription.component';

declare let $: any;

@Component({
  selector: 'fit-send-mails-select-mail',
  templateUrl: './send-mails-select-mail.component.html',
  styleUrls: ['./send-mails-select-mail.component.scss']
})
export class SendMailsSelectMailComponent extends BaseSubscriptionComponent implements OnInit {

  @Input()
  public companies: Company[] = [];

  @Input()
  public companiesHaveBooking: boolean = false;

  @Output()
  public close: EventEmitter<void> = new EventEmitter();

  public FitEmails = FitEmails;
  public currentEvent: Event;

  public constructor(private eventService: EventService,
                     private emailDAO: EmailDAO,
                     private modalWindowService: ModalWindowService,
                     private toastr: ToastrService) {
    super();
  }

  public ngOnInit(): void {
    this.currentEvent = this.eventService.currentEvent.getValue();
    this.addSub(this.eventService.currentEvent.subscribe(e => this.currentEvent = e));
  }

  @HostListener('document:keydown.escape')
  public onKeydownHandler() {
    this.closeWindow();
  }

  public closeWindow(): void {
    this.close.emit();
  }

  public openCustomMailModal(): void {
    if (this.companies.length > 0) {
      $('#customMailModal').modal('show');
    } else {
      this.toastr.warning('Es können keine Mails gesendet werden, wenn keine Firmen ausgewählt sind', 'Senden nicht möglich!');
    }
  }

  public async sendMailPerIdentifier(identifier: FitEmails): Promise<void> {
    if (this.companies.length > 0) {
      let result: boolean = await this.modalWindowService.confirm(
        'Mails wirklich senden?',
        `Wollen sie wirklich <span class="text-bold">` + this.companies.length + ` Mail(s)</span> versenden?`,
        ModalTemplateCreatorHelper.getBasicModalOptions('Ja', 'Abbrechen')
      );

      if (result) {
        await this.emailDAO.sendMails(identifier, this.companies);
        this.toastr.success('Die E-Mails wurden erfolgreich versandt.', 'Mails versandt');
        this.closeWindow();
      }
    } else {
      this.toastr.warning('Es können keine Mails gesendet werden, wenn keine Firmen ausgewählt sind', 'Senden nicht möglich!');
    }
  }
}

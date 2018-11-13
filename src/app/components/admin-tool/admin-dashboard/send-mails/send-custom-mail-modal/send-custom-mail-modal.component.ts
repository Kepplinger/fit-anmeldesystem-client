import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Company } from '../../../../../core/model/company';
import { Email } from '../../../../../core/model/email';
import { EmailDAO } from '../../../../../core/dao/email.dao';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FitEmailEntityType } from '../../../../../core/model/enums/fit-email-entity-type';
import { ToastrService } from 'ngx-toastr';
import { ModalTemplateCreatorHelper } from '../../../../../core/app-helper/modal-template-creator-helper';
import { ModalWindowService } from '../../../../../core/app-services/modal-window.service';
import { EmailVariable } from '../../../../../core/model/email-variable';
import { EmailVariableDAO } from '../../../../../core/dao/email-variable.dao';

declare let $: any;

@Component({
  selector: 'fit-send-custom-mail-modal',
  templateUrl: './send-custom-mail-modal.component.html',
  styleUrls: ['./send-custom-mail-modal.component.scss']
})
export class SendCustomMailModalComponent implements OnInit, OnChanges {

  @Input()
  public companies: Company[] = [];

  @Input()
  public companiesHaveBooking: boolean = false;

  public customMail: Email = new Email();

  public quillEditor: any;
  public currentIndex: number = 0;

  public emailFormGroup: FormGroup;
  public emailVariables: EmailVariable[] = [];

  public constructor(private emailDAO: EmailDAO,
                     private emailVariableDAO: EmailVariableDAO,
                     private toastr: ToastrService,
                     private modalWindowService: ModalWindowService,
                     private fb: FormBuilder) {
    this.emailFormGroup = this.fb.group({
      emailAddress: this.fb.control('', [Validators.required, Validators.email])
    });
  }

  public async ngOnInit(): Promise<void> {
    this.emailVariables = (await this.emailVariableDAO.fetchEmailVariables());
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['companiesHaveBooking']) {
      this.customMail.subject = '';
      this.customMail.template = '';
    }
  }

  public async sendMail(): Promise<void> {
    if (this.companies.length > 0) {
      let result: boolean = await this.modalWindowService.confirm(
        'Mails wirklich senden?',
        `Wollen sie wirklich <span class="text-bold">` + this.companies.length + ` Mail(s)</span> versenden?`,
        ModalTemplateCreatorHelper.getBasicModalOptions('Ja', 'Abbrechen')
      );

      if (result) {
        let entityType: FitEmailEntityType = this.getEntityType();
        await this.emailDAO.sendCustomMail(this.customMail, entityType, this.companies);
        this.toastr.success('Die Emails wurden erfolgreich versendet.', 'Email erfolgreich versendet!');
        $('#customMailModal').modal('hide');
      }
    } else {
      this.toastr.warning('Es können keine Mails gesendet werden, wenn keine Firmen ausgewählt sind', 'Senden nicht möglich!');
    }
  }

  public async sendTestMail(): Promise<void> {
    if (this.emailFormGroup.valid) {
      if (this.companies.length > 0) {
        let entityType: FitEmailEntityType = this.getEntityType();
        await this.emailDAO.sendCustomTestMail(this.customMail, entityType, this.emailFormGroup.value.emailAddress, this.companies[0].id);
        this.toastr.success('Die Test-Email wurde erfolgreich versendet. Überprüfen Sie Ihren Posteingang', 'Test-Email erfolgreich versendet!');
      } else {
        this.toastr.warning('Es können keine Mails gesendet werden, wenn keine Firmen ausgewählt sind', 'Senden nicht möglich!');
      }
    } else {
      this.toastr.error('Die eingegebene Test-Email-Adresse ist nicht gültig.', 'Test-Email konnte nicht gesendet werden!');
    }
  }

  public addVariable(variable: EmailVariable): void {
    this.quillEditor.insertText(this.currentIndex, '{{ ' + variable.value + ' }}');
    this.quillEditor.setSelection(this.currentIndex + variable.value.length + 6, 0);
  }

  public getFilteredEmailVariables(): EmailVariable[] {
    return this.emailVariables.filter(v => v.entity === this.getEntityType());
  }

  private getEntityType(): FitEmailEntityType {
    if (this.companiesHaveBooking) {
      return FitEmailEntityType.Booking;
    } else {
      return FitEmailEntityType.Company;
    }
  }
}

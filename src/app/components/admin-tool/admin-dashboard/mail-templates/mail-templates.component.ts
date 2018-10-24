import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Email } from '../../../../core/model/email';
import { EmailDAO } from '../../../../core/dao/email.dao';
import { EmailHelper } from '../../../../core/model/helper/email-helper';
import { ArrayUtils } from '../../../../core/utils/array-utils';
import { EmailVariable } from '../../../../core/model/email-variable';
import { BaseOnDeactivateAlertComponent } from '../../../../core/base-components/base-on-deactivate-alert.component';
import { EmailsService } from '../../services/emails.service';

@Component({
  selector: 'fit-mail-templates',
  templateUrl: './mail-templates.component.html',
  styleUrls: ['./mail-templates.component.scss']
})
export class MailTemplatesComponent extends BaseOnDeactivateAlertComponent implements OnInit {

  @ViewChild('mailDropdown')
  public dropDownRef: ElementRef;

  public emails: Email[] = [];

  public selectedEmail: Email;
  public editableEmail: Email;

  public quillEditor: any;
  public currentIndex: number = 0;

  public isLoading: boolean = false;

  public constructor(private emailDAO: EmailDAO,
                     private emailsService: EmailsService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.emails = this.emailsService.emails.getValue();
    this.isLoading = this.emailsService.isLoading.getValue();
    this.addSub(this.emailsService.isLoading.subscribe(l => this.isLoading = l));

    this.selectFirstMailIfEmpty();

    this.addSub(this.emailsService.emails.subscribe(e => {
      this.emails = e;
      this.selectFirstMailIfEmpty();
    }));
  }

  public selectEmail(email: Email): void {
    this.selectedEmail = email;
    this.editableEmail = EmailHelper.clone(email);

    setTimeout(() => this.unsavedChangesExist = false, 0);
  }

  public emailChanged(): void {
    this.unsavedChangesExist = true;
  }

  public async saveEmail(): Promise<void> {
    this.editableEmail = await this.emailDAO.updateEmail(this.editableEmail);
    ArrayUtils.replaceElement(this.selectedEmail, this.editableEmail, this.emails);
    this.selectedEmail = this.editableEmail;
    this.unsavedChangesExist = false;
  }

  public discardEmail(): void {
    this.unsavedChangesExist = false;
    this.editableEmail = EmailHelper.clone(this.selectedEmail);
  }

  public addVariable(variable: EmailVariable): void {
    this.quillEditor.insertText(this.currentIndex, '{{ ' + variable.value + ' }}');
    this.quillEditor.setSelection(this.currentIndex + variable.value.length + 6, 0);
    this.emailChanged();
  }

  private selectFirstMailIfEmpty(): void {
    if (this.selectedEmail == null && this.emails.length > 0) {
      this.selectEmail(this.emails[0]);
    }
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Email } from '../../../../core/model/email';
import { EmailDAO } from '../../../../core/dao/email.dao';
import { EmailHelper } from '../../../../core/model/helper/email-helper';
import { ModalWindowService } from '../../../../core/app-services/modal-window.service';
import { ArrayUtils } from '../../../../core/utils/array-utils';

declare let $: any;

@Component({
  selector: 'fit-mail-templates',
  templateUrl: './mail-templates.component.html',
  styleUrls: ['./mail-templates.component.scss']
})
export class MailTemplatesComponent implements OnInit {

  @ViewChild('mailDropdown')
  public dropDownRef: ElementRef;

  public emails: Email[] = [];
  public selectedEmail: Email;
  public editableEmail: Email;

  private isTouched: boolean = false;

  public editorOptions: any = {
    charCounterCount: true,
    heightMin: 350,
    tooltips: true,
    inlineMode: true
  };

  public constructor(private emailDAO: EmailDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.emails = await this.emailDAO.fetchEmails();

    if (this.emails.length !== 0) {
      console.log(this.emails);
      this.selectEmail(this.emails[0]);
    }
  }

  public selectEmail(email: Email): void {
    this.isTouched = false;
    this.selectedEmail = email;
    this.editableEmail = EmailHelper.clone(email);
    console.log(this.selectedEmail);
    console.log(this.editableEmail);
  }

  public emailChanged(): void {
    this.isTouched = true;
  }

  public async saveEmail(): Promise<void> {
    await this.emailDAO.updateEmail(this.editableEmail);
    ArrayUtils.replaceElement(this.selectedEmail, this.editableEmail, this.emails);
    this.selectedEmail = this.editableEmail;
    this.isTouched = false;
  }

  public discardEmail(): void {
    this.isTouched = false;
    this.editableEmail = EmailHelper.clone(this.selectedEmail);
  }
}

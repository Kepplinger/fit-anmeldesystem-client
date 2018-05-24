import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Email } from '../../../../core/model/email';
import { EmailDAO } from '../../../../core/dao/email.dao';
import { EmailHelper } from '../../../../core/model/helper/email-helper';
import { ArrayUtils } from '../../../../core/utils/array-utils';
import { EmailVariable } from '../../../../core/model/email-variable';

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
  public editorOptions: any = {
    charCounterCount: true,
    heightMin: 350,
    tooltips: true,
    inlineMode: true
  };

  public isTouched: boolean = false;
  private editor: any;

  public constructor(private emailDAO: EmailDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.emails = await this.emailDAO.fetchEmails();

    if (this.emails.length !== 0) {
      this.selectEmail(this.emails[0]);
    }
  }

  public selectEmail(email: Email): void {
    this.isTouched = false;
    this.selectedEmail = email;
    this.editableEmail = EmailHelper.clone(email);
  }

  public emailChanged(): void {
    this.isTouched = true;
    // TODO highlight
    // this.saveCursor();
    // this.editableEmail.template = this.editableEmail.template.replace(
    //   /{{[^}}]*}}/g,
    //   `<span style="background-color: yellow">$&</span>`
    // );
    // this.editor.froalaEditor('selection.restore');
    // console.log(this.editableEmail.template);
  }

  public async saveEmail(): Promise<void> {
    this.editableEmail = await this.emailDAO.updateEmail(this.editableEmail);
    ArrayUtils.replaceElement(this.selectedEmail, this.editableEmail, this.emails);
    this.selectedEmail = this.editableEmail;
    this.isTouched = false;
  }

  public discardEmail(): void {
    this.isTouched = false;
    this.editableEmail = EmailHelper.clone(this.selectedEmail);
  }

  public saveCursor(): void {
    this.editor = $('.template-editor');
    this.editor.froalaEditor('selection.save');
  }

  public addVariable(variable: EmailVariable): void {
    this.editor = $('.template-editor');
    this.editor.froalaEditor('selection.restore');
    this.editor.froalaEditor('html.insert', '{{ ' + variable.value + ' }}', true);
    this.emailChanged();
  }
}

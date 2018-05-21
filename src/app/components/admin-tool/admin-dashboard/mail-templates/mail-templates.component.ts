import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Email} from '../../../../core/model/email';
import {EmailDAO} from '../../../../core/dao/email.dao';
import {EmailHelper} from '../../../../core/model/helper/email-helper';
import {ModalWindowService} from '../../../../core/app-services/modal-window.service';
import {ArrayUtils} from '../../../../core/utils/array-utils';
import {EmailVariable} from '../../../../core/model/email-variable';

@Component({
  selector: 'fit-mail-templates',
  templateUrl: './mail-templates.component.html',
  styleUrls: ['./mail-templates.component.scss']
})
export class MailTemplatesComponent implements OnInit {

  @ViewChild('mailDropdown')
  public dropDownRef: ElementRef;

  @ViewChild('editor')
  public editorRef: ElementRef;

  public emails: Email[] = [];
  public selectedEmail: Email;
  public editableEmail: Email;

  public editorOptions: any = {
    charCounterCount: true,
    heightMin: 350,
    tooltips: true,
    inlineMode: true
  };  

  private isTouched: boolean = false;

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
    this.editorRef.nativeElement.froalaEditor('selection.save');
  }

  public addVariable(variable: EmailVariable): void {
    this.editorRef.nativeElement.froalaEditor('selection.restore');
    this.editorRef.nativeElement.froalaEditor('html.insert', '{{ ' + variable.value + ' }}', true);
    this.emailChanged();
  }
}

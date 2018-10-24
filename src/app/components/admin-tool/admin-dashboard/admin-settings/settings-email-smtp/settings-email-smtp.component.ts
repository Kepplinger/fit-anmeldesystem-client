import { Component, OnInit } from '@angular/core';
import { BaseSettingsChangesComponent } from '../../../../../core/base-components/base-settings-changes.component';
import { SmtpConfigDAO } from '../../../../../core/dao/smtp-config.dao';
import { SmtpConfig } from '../../../../../core/model/smtp-config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmailDAO } from '../../../../../core/dao/email.dao';
import { ModalWindowService } from '../../../../../core/app-services/modal-window.service';
import { ModalTemplateCreatorHelper } from '../../../../../core/app-helper/modal-template-creator-helper';

@Component({
  selector: 'fit-settings-email-smtp',
  templateUrl: './settings-email-smtp.component.html',
  styleUrls: ['./settings-email-smtp.component.scss']
})
export class SettingsEmailSmtpComponent extends BaseSettingsChangesComponent implements OnInit {

  public smtpConfig: SmtpConfig;
  public smtpConfigFormGroup: FormGroup;

  public isLoading: boolean = false;

  public constructor(private smtpConfigDAO: SmtpConfigDAO,
                     private emailDAO: EmailDAO,
                     private modalWindowService: ModalWindowService,
                     private fb: FormBuilder,
                     private toastr: ToastrService) {
    super();
    this.smtpConfigFormGroup = this.fb.group({
      host: this.fb.control(''),
      port: this.fb.control(''),
      eMail: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.smtpConfig = await this.smtpConfigDAO.fetchSmtpConfig();
    this.isLoading = false;

    if (this.smtpConfig != null) {
      this.smtpConfigFormGroup.patchValue({
        host: this.smtpConfig.host,
        port: this.smtpConfig.port,
        eMail: this.smtpConfig.mailAddress,
        password: this.smtpConfig.password,
      });
    }

    this.addSub(this.smtpConfigFormGroup.valueChanges.subscribe(() => {
      this.setUnsavedChanges(true);
    }));
  }

  public async updateSmtpConfig(): Promise<void> {
    this.smtpConfig = this.updateSmtpConfigFromForm(this.smtpConfig);
    await this.smtpConfigDAO.updateSmtpConfig(this.smtpConfig);
    this.toastr.success('Die Einstellungen wurden erfolgreich gespeichert.', 'SMTP - Einstellungen gespeichert');
    this.setUnsavedChanges(false);
  }

  public async sendTestMail(): Promise<void> {
    let smtpConfig = this.updateSmtpConfigFromForm(new SmtpConfig());
    let emailAddress = await this.modalWindowService.prompt(
      'E-Mail Empfänger angeben',
      'Geben Sie bitte in das Feld eine gültige E-Mail Adresse an',
      '',
      ModalTemplateCreatorHelper.getBasicModalOptions('Senden', 'Abbrechen')
    );

    this.emailDAO.sendSmtpTestMail(smtpConfig, emailAddress);
    this.toastr.success('Überprüfen Sie bitte ob die Mail auch erfolgreich angekommen ist.', 'Mail versandt!');
  }

  private updateSmtpConfigFromForm(smtpConfig: SmtpConfig): SmtpConfig {
      smtpConfig.host = this.smtpConfigFormGroup.value.host;
      smtpConfig.port = this.smtpConfigFormGroup.value.port;
      smtpConfig.mailAddress = this.smtpConfigFormGroup.value.eMail;
      smtpConfig.password = this.smtpConfigFormGroup.value.password;
      return smtpConfig;
  }
}

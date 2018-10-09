import { AppConfig } from '../app-config/app-config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../model/email';
import { SmtpConfig } from '../model/smtp-config';
import { Company } from '../model/company';
import { FitEmailEntityType } from '../model/enums/fit-email-entity-type';

@Injectable()
export class EmailDAO {

  public constructor(private http: HttpClient,
                     private appConfig: AppConfig) {
  }

  public fetchEmails(): Promise<Email[]> {
    return this.http.get<Email[]>(this.appConfig.serverURL + '/email')
      .toPromise();
  }

  public updateEmail(email: Email): Promise<Email> {
    return this.http.put<Email>(this.appConfig.serverURL + '/email', email)
      .toPromise();
  }

  public sendMails(identifier: string, companies: Company[]): Promise<void> {
    let companyIds: number[] = companies.map(c => c.id);

    return this.http.post<void>(this.appConfig.serverURL + '/email/' + identifier, companyIds)
      .toPromise();
  }

  public sendCustomMail(email: Email, entityType: FitEmailEntityType, companies: Company[]): Promise<void> {
    let companyIds: number[] = companies.map(c => c.id);

    let json: any = {
      subject: email.subject,
      body: email.template,
      entityType: entityType,
      companyIds: companyIds
    };

    return this.http.post<void>(this.appConfig.serverURL + '/email/custom', json)
      .toPromise();
  }

  public sendCustomTestMail(email: Email, entityType: FitEmailEntityType, receiver: string, companyId: number): Promise<void> {
    let json: any = {
      subject: email.subject,
      body: email.template,
      entityType: entityType,
      companyId: companyId,
      receiver: receiver
    };

    return this.http.post<void>(this.appConfig.serverURL + '/email/custom/test', json)
      .toPromise();
  }

  public sendTestMail(emailId: number, emailAddress: string, entityId: number, entityType: string): Promise<void> {
    let params = new HttpParams()
      .set('emailAddress', emailAddress)
      .set('entityId', String(entityId))
      .set('entityType', entityType);

    return this.http.get<void>(this.appConfig.serverURL + '/email/' + emailId, { params: params })
      .toPromise();
  }

  public sendSmtpTestMail(smtpConfig: SmtpConfig, emailAddress: string): Promise<void> {
    let params = new HttpParams()
      .set('emailAddress', emailAddress);

    return this.http.post<void>(this.appConfig.serverURL + '/email/smtp', smtpConfig, { params: params})
      .toPromise();
  }
}

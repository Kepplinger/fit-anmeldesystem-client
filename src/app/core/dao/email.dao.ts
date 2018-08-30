import { AppConfig } from '../app-config/app-config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../model/email';
import { SmtpConfig } from '../model/smtp-config';

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

import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { SmtpConfig } from '../model/smtp-config';
import { publishLast, refCount } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class SmtpConfigDAO {

  private smtpConfigCache: Promise<SmtpConfig> = null;

  public constructor(private appConfig: AppConfig,
                     private httpClient: HttpClient) {
  }

  public fetchSmtpConfig(): Promise<SmtpConfig> {
    if (this.smtpConfigCache == null) {
      this.smtpConfigCache = this.httpClient.get<SmtpConfig>(this.appConfig.serverURL + '/smtpConfig')
        .pipe(publishLast(), refCount())
        .toPromise();
    }

    return this.smtpConfigCache;
  }

  public updateSmtpConfig(smtpConfig: SmtpConfig): Promise<SmtpConfig> {
    this.smtpConfigCache = this.httpClient.put<SmtpConfig>(this.appConfig.serverURL + '/smtpConfig', smtpConfig)
      .pipe(publishLast(), refCount())
      .toPromise();

    return this.smtpConfigCache;
  }
}

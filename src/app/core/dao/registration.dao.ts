import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';

@Injectable()
export class RegistrationDao {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async verifyCompanyMail(companyMail: string): Promise<boolean> {
    return this.http.post<any>(this.appConfig.serverURL + '/registration', {email: companyMail})
      .map((data: any) => data.existing)
      .toPromise();
  }

  public async sendMail(companyMail: string): Promise<void> {
    return this.http.post<void>(this.appConfig.serverURL + '/registration/mail/code', {email: companyMail})
      .toPromise();
  }
}

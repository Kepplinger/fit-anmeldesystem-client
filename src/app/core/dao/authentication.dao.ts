import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { ErrorInterceptor } from './helper/error-interceptor';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthenticationDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async verifyCompanyMail(companyMail: string): Promise<boolean> {
    return this.http.post<any>(this.appConfig.serverURL + '/authentication', {email: companyMail})
      .map((data: any) => data.existing)
      .toPromise();
  }

  public async sendMail(companyMail: string): Promise<void> {
    return this.http.post<void>(this.appConfig.serverURL + '/authentication/mail/code', {email: companyMail})
      .toPromise();
  }

  public async loginCompany(token: string): Promise<any> {
    return this.http.post<any>(this.appConfig.serverURL + '/authentication/company/token', {token: token})
      .catch(ErrorInterceptor.catchErrorMessage)
      .toPromise();
  }
}

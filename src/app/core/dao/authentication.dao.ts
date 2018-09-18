import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { ErrorInterceptor } from './helper/error-interceptor';


import { MemberLoginResponse } from '../app-helper/helper-model/member-login-response';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthenticationDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async verifyCompanyMail(companyMail: string): Promise<boolean> {
    return this.http.post<any>(this.appConfig.serverURL + '/authentication', {email: companyMail})
      .pipe(map((data: any) => data.existing))
      .toPromise();
  }

  public async sendMail(companyMail: string): Promise<void> {
    return this.http.post<void>(this.appConfig.serverURL + '/authentication/mail/code', {email: companyMail})
      .toPromise();
  }

  public async loginMember(token: string): Promise<MemberLoginResponse | HttpErrorResponse> {
    return this.http.post<MemberLoginResponse>(this.appConfig.serverURL + '/authentication/token', {token: token})
      .pipe(catchError(ErrorInterceptor.catchErrorMessage))
      .toPromise();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { ErrorInterceptor } from './helper/error-interceptor';


import { MemberLoginResponse } from '../app-helper/helper-model/member-login-response';
import { catchError, map } from 'rxjs/operators';
import { FitHttpError } from '../app-helper/helper-model/fit-http-error';

@Injectable()
export class AuthenticationDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async verifyCompanyMail(companyMail: string, useGraduateMails: boolean = false): Promise<boolean> {
    return this.http.post<any>(this.appConfig.serverURL + '/authentication', {email: companyMail, useGraduateMails: useGraduateMails})
      .pipe(map((data: any) => data.existing))
      .toPromise();
  }

  public async sendMail(companyMail: string, useGraduateMails: boolean = false): Promise<void> {
    return this.http.post<void>(this.appConfig.serverURL + '/authentication/mail/code', {email: companyMail, useGraduateMails: useGraduateMails})
      .toPromise();
  }

  public async loginMember(token: string): Promise<MemberLoginResponse | FitHttpError> {
    return this.http.post<MemberLoginResponse>(this.appConfig.serverURL + '/authentication/token', {token: token})
      .pipe(catchError(ErrorInterceptor.catchErrorMessage))
      .toPromise();
  }
}

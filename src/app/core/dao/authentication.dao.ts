import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthenticationDao {

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

  public async loginBooking(token: string): Promise<any> {
    return this.http.post<any>(this.appConfig.serverURL + '/authentication/booking/token', {token: token})
      .catch((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return Observable.of(error.error);
        } else {
          return Observable.of(null);
        }
      })
      .toPromise();
  }
}

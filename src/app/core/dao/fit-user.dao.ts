import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { ErrorInterceptor } from './helper/error-interceptor';
import * as CryptoJS from 'crypto-js';
import { catchError } from 'rxjs/operators';
import { FitUserRole } from '../model/enums/fit-user-role';
import { FitUser } from '../model/fit-user';
import { MemberLoginResponse } from '../app-helper/helper-model/member-login-response';

@Injectable()
export class FitUserDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async loginAdmin(email: string, password: string): Promise<any> {
    // password = CryptoJS.SHA256(password).toString();
    return this.http.post<any>(this.appConfig.serverURL + '/auth/login', {userName: email, password: password})
      .pipe(catchError(ErrorInterceptor.catchErrorMessage))
      .toPromise();
  }

  public async createAdmin(email: string, password: string, role: FitUserRole): Promise<FitUser | HttpErrorResponse> {
    let json: any = {
      fitUser: new FitUser(email, role),
      password: password
    };

    return this.http.post<FitUser>(this.appConfig.serverURL + '/account', json)
      .pipe(catchError(ErrorInterceptor.catchErrorMessage))
      .toPromise();
  }

  public async fetchAllUsers(): Promise<FitUser[]> {
    return this.http.get<FitUser[]>(this.appConfig.serverURL + '/account')
      .toPromise();
  }

  public async deleteUser(fitUser: FitUser): Promise<void> {
    await this.http.delete<void>(this.appConfig.serverURL + '/account/' + fitUser.id)
      .toPromise();
  }
}

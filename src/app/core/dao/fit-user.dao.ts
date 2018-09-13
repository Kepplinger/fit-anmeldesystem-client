import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { ErrorInterceptor } from './helper/error-interceptor';
import * as CryptoJS from 'crypto-js';
import { catchError } from 'rxjs/operators';
import { FitUserRole } from '../model/enums/fit-user-role';
import { FitUser } from '../model/fit-user';

@Injectable()
export class FitUserDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  // admin PassMe123!
  public async loginAdmin(email: string, password: string): Promise<any> {
    // password = CryptoJS.SHA256(password).toString();
    return this.http.post<any>(this.appConfig.serverURL + '/auth/login', {userName: email, password: password})
      .pipe(catchError(ErrorInterceptor.catchErrorMessage))
      .toPromise();
  }

  public async createAdmin(email: string, password: string, role: FitUserRole): Promise<void> {

    let json: any = {
      fitUser: new FitUser(email, role),
      password: password
    };

    return this.http.post<void>(this.appConfig.serverURL + '/account', json)
      .toPromise();
  }
}

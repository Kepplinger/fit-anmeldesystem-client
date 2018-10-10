import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { ErrorInterceptor } from './helper/error-interceptor';
import * as CryptoJS from 'crypto-js';
import { catchError, publishLast, refCount } from 'rxjs/operators';
import { FitUserRole } from '../model/enums/fit-user-role';
import { FitUser } from '../model/fit-user';
import { FitHttpError } from '../app-helper/helper-model/fit-http-error';

@Injectable()
export class FitUserDAO {

  public fitUserCache: Promise<FitUser[]> = null;

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async loginAdmin(email: string, password: string): Promise<any> {
    password = CryptoJS.SHA256(password).toString().toUpperCase();
    return this.http.post<any>(this.appConfig.serverURL + '/auth/login', {userName: email, password: password})
      .pipe(catchError(ErrorInterceptor.catchErrorMessage))
      .toPromise();
  }

  public async createAdmin(email: string, password: string, role: FitUserRole): Promise<FitUser[] | FitHttpError> {
    let json: any = {
      fitUser: new FitUser(email, role),
      password: CryptoJS.SHA256(password).toString().toUpperCase()
    };

    let response = this.http.post<FitUser[]>(this.appConfig.serverURL + '/account', json)
      .pipe(
        publishLast(), refCount(),
        catchError(ErrorInterceptor.catchErrorMessage)
      )
      .toPromise();

    if ((await response) instanceof FitHttpError) {
      return response;
    } else {
      this.fitUserCache = response as Promise<FitUser[]>;
      return this.fitUserCache;
    }
  }

  public async fetchAllUsers(): Promise<FitUser[]> {
    if (this.fitUserCache == null) {
      this.fitUserCache = this.http.get<FitUser[]>(this.appConfig.serverURL + '/account')
        .pipe(publishLast(), refCount())
        .toPromise();
    }

    return this.fitUserCache;
  }

  public async deleteUser(fitUser: FitUser): Promise<FitUser[]> {
    this.fitUserCache = this.http.delete<FitUser[]>(this.appConfig.serverURL + '/account/' + fitUser.id)
      .pipe(publishLast(), refCount())
      .toPromise();

    return this.fitUserCache;
  }
}

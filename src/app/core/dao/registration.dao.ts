import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';

@Injectable()
export class RegistrationDao {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async verifyCompanyMail(companyMail: string): Promise<boolean> {
    return this.http.post<boolean>(this.appConfig.serverURL + '/registration', companyMail)
      .toPromise();
  }
}

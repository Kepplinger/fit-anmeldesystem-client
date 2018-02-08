import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../app-config/app-config.service';
import { Company } from '../model/company';

@Injectable()
export class CompanyDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchCompanies(): Promise<Company[]> {
    return this.http.get<Company[]>(this.appConfig.serverURL + '/company')
      .toPromise();
  }

  public async persistCompany(company: Company): Promise<Company> {
    return this.http.post<Company>(this.appConfig.serverURL + '/company', company)
      .toPromise();
  }
}

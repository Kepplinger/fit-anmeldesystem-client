import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AppConfig } from '../app-config/app-config.service';
import { Company } from '../model/company';
import { CompanyMapper } from '../model/mapper/company-mapper';

@Injectable()
export class CompanyDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchCompanies(): Promise<Company[]> {
    return this.http.get<any[]>(this.appConfig.serverURL + '/company')
      .map(
        (data: any[]) => {
          return CompanyMapper.mapJsonToCompanyList(data);
        }
      )
      .toPromise();
  }

  public async fetchPendingCompanies(): Promise<Company[]> {
    return this.http.get<any[]>(this.appConfig.serverURL + '/company/pending')
      .map(
        (data: any[]) => {
          return CompanyMapper.mapJsonToCompanyList(data);
        }
      )
      .toPromise();
  }

  public async persistCompany(company: Company): Promise<Company> {
    return this.http.post<any>(this.appConfig.serverURL + '/company', company)
      .map(
        (data: any) => {
          return CompanyMapper.mapJsonToCompany(data);
        }
      )
      .toPromise();
  }

  public async updateCompany(company: Company): Promise<Company> {
    return this.http.put<any>(this.appConfig.serverURL + '/company', company)
      .map(
        (data: any) => {
          return CompanyMapper.mapJsonToCompany(data);
        }
      )
      .toPromise();
  }

  public async verifyCompany(company: Company): Promise<Company> {
    return this.http.put<any>(this.appConfig.serverURL + '/company/accepting', company.id)
      .map(
        (data: any) => {
          return CompanyMapper.mapJsonToCompany(data);
        }
      )
      .toPromise();
  }

  public async deleteCompany(company: Company): Promise<void> {
    return this.http.delete<void>(this.appConfig.serverURL + '/company/' + company.id)
      .toPromise();
  }

  public async assignCompany(pendingCompany: Company, existingCompany: Company): Promise<void> {

    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('pendingCompanyId', String(pendingCompany.id));
    params = params.append('existingCompanyId', String(existingCompany.id));

    this.http.delete<void>(this.appConfig.serverURL + '/company/assign', {params: params})
      .toPromise();
  }
}

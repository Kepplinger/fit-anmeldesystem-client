import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { Branch } from '../model/branch';

@Injectable()
export class BranchDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchBranches(): Promise<Branch[]> {
    return this.http.get<Branch[]>(this.appConfig.serverURL + '/branch')
      .toPromise();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppConfig } from '../app-config/app-config.service';
import { Package } from '../model/package';

@Injectable()
export class PackageDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchPackages(): Promise<Package[]> {
    return this.http.get<Package[]>(this.appConfig.serverURL + '/package')
      .toPromise();
  }
}

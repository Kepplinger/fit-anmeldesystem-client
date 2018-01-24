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

    // return [
    //   new Package('Grundpaket', 200, 1),
    //   new Package('Sponsorpaket', 400, 2),
    //   new Package('Vortragspaket', 600, 3),
    // ];

    return this.http.get<Package[]>(this.appConfig.serverURL + '/package')
      .toPromise();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppConfig } from '../app-config/app-config.service';
import { Package } from '../model/package';
import { Branch } from '../model/branch';
import { publishLast, refCount } from 'rxjs/operators';

@Injectable()
export class PackageDAO {

  private packageCache: Promise<Package[]> | Package[] = null;

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchPackages(): Promise<Package[]> {
    if (this.packageCache == null) {
      this.packageCache = this.http.get<Package[]>(this.appConfig.serverURL + '/package')
        .pipe(publishLast(), refCount())
        .toPromise();
    }

    return this.packageCache;
  }

  public async updatePackage(fitPackge: Package): Promise<Package[]> {
    this.packageCache = this.http.put<Package[]>(this.appConfig.serverURL + '/package', fitPackge)
      .pipe(publishLast(), refCount())
      .toPromise();

    return this.packageCache;
  }
}

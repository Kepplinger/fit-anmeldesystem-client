import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../model/resource';
import { Branch } from '../model/branch';
import { publishLast, refCount } from 'rxjs/operators';

@Injectable()
export class ResourceDAO {

  private resourceCache: Promise<Resource[]> = null;

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchResources(): Promise<Resource[]> {
    if (this.resourceCache == null) {
      return this.http.get<Resource[]>(this.appConfig.serverURL + '/resource')
        .pipe(publishLast(), refCount())
        .toPromise();
    } else {
      return this.resourceCache;
    }
  }
}

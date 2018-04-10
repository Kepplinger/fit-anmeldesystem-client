import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../model/resource';

@Injectable()
export class ResourceDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchResources(): Promise<Resource[]> {
    return this.http.get<Resource[]>(this.appConfig.serverURL + '/resource')
      .toPromise();
  }
}

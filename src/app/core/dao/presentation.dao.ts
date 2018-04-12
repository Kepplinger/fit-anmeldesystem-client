import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PresentationDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchPresentations(id: number): Promise<any[]> {
    return this.http.get<any[]>(this.appConfig.serverURL + '/presentation/' + id)
      .toPromise();
  }
}

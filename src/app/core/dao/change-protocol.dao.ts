import { HttpClient } from '@angular/common/http';
import { ChangeProtocol } from '../model/change-protocol';
import { AppConfig } from '../app-config/app-config.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ChangeProtocolDAO {

  public constructor(private http: HttpClient,
                     private appConfig: AppConfig) {
  }

  public fetchChangeProtocol(): Promise<ChangeProtocol[]> {
    return this.http.get<ChangeProtocol[]>(this.appConfig.serverURL + '/change-protocol')
      .toPromise();
  }

}

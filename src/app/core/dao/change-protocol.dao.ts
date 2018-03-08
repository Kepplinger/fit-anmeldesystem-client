import { HttpClient } from '@angular/common/http';
import { ChangeProtocol } from '../model/change-protocol';
import { AppConfig } from '../app-config/app-config.service';
import { Injectable } from '@angular/core';
import { ChangeProtocolHelper } from '../model/helper/change-protocol-helper';

@Injectable()
export class ChangeProtocolDAO {

  public constructor(private http: HttpClient,
                     private appConfig: AppConfig) {
  }

  public fetchChangeProtocol(): Promise<ChangeProtocol[]> {
    return this.http.get<ChangeProtocol[]>(this.appConfig.serverURL + '/change')
      .map((data: any) => {
        return ChangeProtocolHelper.parseJsonToChangeList(data);
      })
      .toPromise();
  }

  public applyChangeProtocol(change: ChangeProtocol): Promise<ChangeProtocol> {
    return this.http.put<ChangeProtocol>(this.appConfig.serverURL + '/change/apply', change.id)
      .toPromise();
  }

  public revertChangeProtocol(change: ChangeProtocol): Promise<ChangeProtocol> {
    return this.http.put<ChangeProtocol>(this.appConfig.serverURL + '/change/revert', change.id)
      .toPromise();
  }
}

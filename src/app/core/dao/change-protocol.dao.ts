import { HttpClient } from '@angular/common/http';
import { ChangeProtocol } from '../model/change-protocol';
import { AppConfig } from '../app-config/app-config.service';
import { Injectable } from '@angular/core';
import { ChangeProtocolMapper } from '../model/mapper/change-protocol-mapper';
import { map } from 'rxjs/operators';

@Injectable()
export class ChangeProtocolDAO {

  public constructor(private http: HttpClient,
                     private appConfig: AppConfig) {
  }

  public fetchChangeProtocol(): Promise<ChangeProtocol[]> {
    return this.http.get<ChangeProtocol[]>(this.appConfig.serverURL + '/change')
      .pipe(
        map((data: any) => {
          return ChangeProtocolMapper.mapJsonToChangeList(data);
        }))
      .toPromise();
  }

  public applyChangeProtocol(change: ChangeProtocol): Promise<ChangeProtocol> {
    return this.http.put<ChangeProtocol>(this.appConfig.serverURL + '/change/apply', change.id)
      .pipe(
        map((data: any) => {
          return ChangeProtocolMapper.mapJsonToChangeProtocol(data);
        }))
      .toPromise();
  }

  public revertChangeProtocol(change: ChangeProtocol): Promise<ChangeProtocol> {
    return this.http.put<ChangeProtocol>(this.appConfig.serverURL + '/change/revert', change.id)
      .pipe(
        map((data: any) => {
          return ChangeProtocolMapper.mapJsonToChangeProtocol(data);
        }))
      .toPromise();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { Area } from '../model/area';

@Injectable()
export class AreaDAO {

  public constructor(private http: HttpClient,
                     private appConfig: AppConfig) {
  }

  public fetchAreasFromEvent(eventId: number): Promise<Area[]> {
    return this.http.get<Area[]>(this.appConfig.serverURL + '/area/' + eventId)
      .toPromise();
  }

  public updateArea(area: Area): Promise<void> {
    return this.http.put<void>(this.appConfig.serverURL + '/area', area)
      .toPromise();
  }

  public createArea(area: Area): Promise<Area> {
    return this.http.post<Area>(this.appConfig.serverURL + '/area', area)
      .toPromise();
  }

}

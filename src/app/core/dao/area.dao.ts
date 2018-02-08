import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { Area } from '../model/area';

@Injectable()
export class AreaDAO {

  public constructor(private http: HttpClient,
                     private appConfig: AppConfig) {
  }

  public fetchAreasFromEvent(eventId: number): Area[] {
    // return this.http.get<Area[]>(this.appConfig.serverURL + '/area/' + eventId)
    //   .toPromise();

    return [
      new Area('Untergeschoss', '../../../../../../assets/og1.png', 1),
      new Area('Erdgeschoss', '../../../../../../assets/eg.png', 2),
      new Area('1. Stock', '../../../../../../assets/og1.png', 3),
      new Area('2. Stock', '../../../../../../assets/og2.png', 4)
    ]
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

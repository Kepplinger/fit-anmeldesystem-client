import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { Area } from '../model/area';

@Injectable()
export class AreaDAO {

  public constructor(private http: HttpClient,
                     private appConfig: AppConfig) {
  }

  public getAreasFromEvent(eventId: number): Area[] {
    // return this.http.get<Area[]>(this.appConfig.serverURL + '/area/' + eventId)
    //   .toPromise();

    return [
      new Area('Untergeschoss', '../../../../../../assets/og1.png', eventId, 1),
      new Area('Erdgeschoss', '../../../../../../assets/eg.png', eventId, 2),
      new Area('1. Stock', '../../../../../../assets/og1.png', eventId, 3),
      new Area('2. Stock', '../../../../../../assets/og2.png', eventId, 4)
    ]
  }

}

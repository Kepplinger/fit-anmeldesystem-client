import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PresentationMapper } from '../model/mapper/presentation-mapper';
import { Presentation } from '../model/presentation';

@Injectable()
export class PresentationDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchPresentations(id: number): Promise<Presentation[]> {
    return this.http.get<Presentation[]>(this.appConfig.serverURL + '/presentation/' + id)
      .pipe(
        map(p => PresentationMapper.mapJsonToPresentationList(p))
      )
      .toPromise();
  }
}

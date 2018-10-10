import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { PresentationMapper } from '../model/mapper/presentation-mapper';
import { CompanyPresentation } from '../app-helper/helper-model/company-presentation';
import { CompanyMapper } from '../model/mapper/company-mapper';
import { Presentation } from '../model/presentation';
import { IsAccepted } from '../model/enums/is-accepted';

@Injectable()
export class PresentationDAO {



  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchPresentations(id: number): Promise<CompanyPresentation[]> {
    return this.http.get<any[]>(this.appConfig.serverURL + '/presentation/' + id)
      .pipe(
        map((data: CompanyPresentation[]) => data.map(d => {
            return {
              company: CompanyMapper.mapJsonToCompany(d.company),
              presentation: PresentationMapper.mapJsonToPresentation(d.presentation)
            } as CompanyPresentation;
          })
        ))
      .toPromise();
  }

  public async acceptPresentation(presentation: Presentation, status: IsAccepted): Promise<Presentation> {
    return this.http.put<any>(this.appConfig.serverURL + '/presentation/accept/' + presentation.id, status)
      .pipe(map(p => PresentationMapper.mapJsonToPresentation(p)))
      .toPromise();
  }

  public async updatePresentation(presentation: Presentation): Promise<Presentation> {
    return this.http.put<any>(this.appConfig.serverURL + '/presentation', PresentationMapper.mapPresentationToJson(presentation))
      .pipe(map(p => PresentationMapper.mapJsonToPresentation(p)))
      .toPromise();
  }
}

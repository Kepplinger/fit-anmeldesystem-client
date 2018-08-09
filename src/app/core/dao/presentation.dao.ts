import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PresentationMapper } from '../model/mapper/presentation-mapper';
import { CompanyPresentation } from '../app-helper/helper-model/company-presentation';
import { CompanyMapper } from '../model/mapper/company-mapper';

@Injectable()
export class PresentationDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchPresentations(id: number): Promise<any[]> {
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
}

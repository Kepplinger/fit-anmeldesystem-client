import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Graduate } from '../model/graduate';

@Injectable()
export class GraduateDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async updateGraduate(graduate: Graduate): Promise<Graduate> {
    return this.http.put<Graduate>(this.appConfig.serverURL + '/graduate', graduate)
      .toPromise();
  }

  public fetchGraduates(): Promise<Graduate[]> {
    return this.http.get<Graduate[]>(this.appConfig.serverURL + '/graduate')
      .toPromise();
  }
}

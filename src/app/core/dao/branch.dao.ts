import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-configs/app-configs.service';
import { Branch } from '../model/branch';

@Injectable()
export class BranchDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async getBranches(): Promise<Branch[]> {

    return [
      new Branch('Informatik / Medientechnik', 1),
      new Branch('Elektronik und Technische Informatik', 2),
      new Branch('Biomedizin- und Gesundheitstechnik', 3)
    ];

    // return this.http.get<Branch[]>(this.appConfig.serverURL + 'api/branch')
    //   .toPromise();
  }

}

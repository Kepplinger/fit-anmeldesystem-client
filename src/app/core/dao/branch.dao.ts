import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { Branch } from '../model/branch';
import { publishLast, refCount } from 'rxjs/operators';

@Injectable()
export class BranchDAO {

  private branchCache = null;

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchBranches(): Promise<Branch[]> {

    if (this.branchCache == null) {
      this.branchCache = this.http.get<Branch[]>(this.appConfig.serverURL + '/branch')
        .pipe(publishLast(), refCount())
        .toPromise();
    }

    return this.branchCache;
  }
}

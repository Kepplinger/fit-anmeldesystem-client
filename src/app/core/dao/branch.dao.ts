import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../app-config/app-config.service';
import { Branch } from '../model/branch';
import { publishLast, refCount } from 'rxjs/operators';

@Injectable()
export class BranchDAO {

  private branchCache: Promise<Branch[]> | Branch[] = null;
  private archivedBranchCache: Promise<Branch[]> | Branch[] = null;

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

  public async fetchArchivedBranches(): Promise<Branch[]> {
    if (this.archivedBranchCache == null) {
      this.archivedBranchCache = this.http.get<Branch[]>(this.appConfig.serverURL + '/branch/archive')
        .pipe(publishLast(), refCount())
        .toPromise();
    }

    return this.archivedBranchCache;
  }

  public async updateBranches(branches: Branch[]): Promise<Branch[]> {
    let updatedBranches = await this.http.put<Branch[]>(this.appConfig.serverURL + '/branch', branches)
      .toPromise();

    this.branchCache = updatedBranches.filter(b => !b.isArchive);
    this.archivedBranchCache = updatedBranches.filter(b => b.isArchive);

    return updatedBranches;
  }
}

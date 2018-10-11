import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { LockPage } from '../model/lock-page';

@Injectable()
export class LockPageDAO {

  private lockPageCache: Promise<LockPage> = null;

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async getLockPage(): Promise<LockPage> {
    if (this.lockPageCache) {
      this.lockPageCache = this.http.get<LockPage>(this.appConfig.serverURL + '/lockPage')
        .toPromise();
    }

    return this.lockPageCache;
  }

  public async updateLockPage(lockPage: LockPage): Promise<LockPage> {
    this.lockPageCache = this.http.post<LockPage>(this.appConfig.serverURL + '/lockPage', lockPage)
      .toPromise();

    return this.lockPageCache;
  }
}

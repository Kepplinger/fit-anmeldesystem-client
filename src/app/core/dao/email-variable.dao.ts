import { publishLast, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { Injectable } from '@angular/core';
import { EmailVariable } from '../model/email-variable';

@Injectable()
export class EmailVariableDAO {

  public emailVariableCache: Promise<EmailVariable[]> = null;

  public constructor(private http: HttpClient,
                     private appConfig: AppConfig) {
  }

  public async fetchEmailVariables(): Promise<EmailVariable[]> {
    if (this.emailVariableCache == null) {
      this.emailVariableCache = this.http.get<EmailVariable[]>(this.appConfig.serverURL + '/emailVariable')
        .pipe(publishLast(), refCount())
        .toPromise();
    }
    return this.emailVariableCache;
  }
}

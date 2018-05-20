import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../model/email';

@Injectable()
export class EmailDAO {

  public constructor(private http: HttpClient,
                     private appConfig: AppConfig) {
  }

  public fetchEmails(): Promise<Email[]> {
    return this.http.get<Email[]>(this.appConfig.serverURL + '/email')
      .toPromise();
  }

  public updateEmail(email: Email): Promise<Email> {
    return this.http.put<Email>(this.appConfig.serverURL + '/email', email)
      .toPromise();
  }
}

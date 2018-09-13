import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../model/tag';

@Injectable()
export class TagDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchTags(): Promise<Tag[]> {
    return this.http.get<Tag[]>(this.appConfig.serverURL + '/tag')
      .toPromise();
  }

  public async syncTags(tags: Tag[]): Promise<Tag[]> {
    return this.http.put<Tag[]>(this.appConfig.serverURL + '/tag', tags)
      .toPromise();
  }
}

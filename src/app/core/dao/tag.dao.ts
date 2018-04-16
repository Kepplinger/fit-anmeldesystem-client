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

  public async createTag(tag: Tag): Promise<Tag> {
    return this.http.post<Tag>(this.appConfig.serverURL + '/tag', tag)
      .toPromise();
  }

  public async archiveTag(tag: Tag): Promise<Tag> {
    return this.http.put<Tag>(this.appConfig.serverURL + '/tag/archive', tag)
      .toPromise();
  }
}

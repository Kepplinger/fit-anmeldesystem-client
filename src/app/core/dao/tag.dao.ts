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

    // return [
    //   new Tag('Informatik', false, 1),
    //   new Tag('Medientechnik', false, 2),
    //   new Tag('Elektronik', false, 3),
    //   new Tag('Nett', false, 4),
    //   new Tag('Böse', false, 5),
    //   new Tag('Sehr langer Tag der grinding ist', false, 6),
    //   new Tag('Informatik', false, 7),
    //   new Tag('Elektronik', false, 8),
    //   new Tag('Informatik', false, 9),
    //   new Tag('Medientechnik etwas mehr', false, 10),
    //   new Tag('Informatik', false, 11),
    //   new Tag('Elektronik', false, 12),
    //   new Tag('Nett', false, 13),
    //   new Tag('Elektronik', false, 14),
    //   new Tag('Elektronik', false, 15),
    //   new Tag('Medientechnik', false, 16),
    //   new Tag('Informatik etwas mehr', false, 17),
    //   new Tag('Nett', false, 18),
    //   new Tag('Medientechnik', false, 19),
    //   new Tag('Informatik', false, 20),
    //   new Tag('Informatik', false, 21),
    //   new Tag('Informatik', false, 22),
    //   new Tag('Informatik', false, 23),
    //   new Tag('Informatik', false, 24),
    //   new Tag('Informatik', false, 25),
    //   new Tag('Informatik', false, 26),
    //   new Tag('Informatik', false, 27),
    //   new Tag('Informatik', false, 28),
    //   new Tag('Informatik', false, 28),
    // ];

    return this.http.get<Tag[]>(this.appConfig.serverURL + '/tag')
      .toPromise();
  }

  public async syncTags(tags: Tag[]): Promise<Tag[]> {
    return this.http.put<Tag[]>(this.appConfig.serverURL + '/tag', tags)
      .toPromise();
  }
}

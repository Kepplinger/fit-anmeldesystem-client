import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../model/resource';
import { publishLast, refCount } from 'rxjs/operators';

@Injectable()
export class ResourceDAO {

  private resourceCache: Promise<Resource[]> | Resource[] = null;
  private archivedResourceCache: Promise<Resource[]> | Resource[] = null;

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchResources(): Promise<Resource[]> {
    if (this.resourceCache == null) {
      return this.http.get<Resource[]>(this.appConfig.serverURL + '/resource')
        .pipe(publishLast(), refCount())
        .toPromise();
    } else {
      return this.resourceCache;
    }
  }

  public async fetchArchivedResources(): Promise<Resource[]> {
    if (this.archivedResourceCache == null) {
      this.archivedResourceCache = this.http.get<Resource[]>(this.appConfig.serverURL + '/resource/archive')
        .pipe(publishLast(), refCount())
        .toPromise();
    }

    return this.archivedResourceCache;
  }

  public async updateResources(resources: Resource[]): Promise<Resource[]> {
    let updateResources = await this.http.put<Resource[]>(this.appConfig.serverURL + '/resource', resources)
      .toPromise();

    this.resourceCache = updateResources.filter(b => !b.isArchive);
    this.archivedResourceCache = updateResources.filter(b => b.isArchive);

    return updateResources;
  }
}

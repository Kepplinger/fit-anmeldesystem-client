import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { publishLast, refCount } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MemberStatus } from '../model/member-status';

@Injectable()
export class MemberStatusDAO {

  private memberStatusCache: Promise<MemberStatus[]> | MemberStatus[] = null;
  private archivedMemberStatusCache: Promise<MemberStatus[]> | MemberStatus[] = null;

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchMemberStati(): Promise<MemberStatus[]> {
    if (this.memberStatusCache == null) {
      this.memberStatusCache = this.http.get<MemberStatus[]>(this.appConfig.serverURL + '/memberStatus')
        .pipe(publishLast(), refCount())
        .toPromise();
    }

    return this.memberStatusCache;
  }

  public async fetchArchivedMemberStati(): Promise<MemberStatus[]> {
    if (this.archivedMemberStatusCache == null) {
      this.archivedMemberStatusCache = this.http.get<MemberStatus[]>(this.appConfig.serverURL + '/memberStatus/archive')
        .pipe(publishLast(), refCount())
        .toPromise();
    }

    return this.archivedMemberStatusCache;
  }

  public async updateMemberStati(memberStati: MemberStatus[]): Promise<MemberStatus[]> {
    let updatedMemberStati = await this.http.put<MemberStatus[]>(this.appConfig.serverURL + '/memberStatus', memberStati)
      .toPromise();

    this.memberStatusCache = updatedMemberStati.filter(b => !b.isArchive);
    this.archivedMemberStatusCache = updatedMemberStati.filter(b => b.isArchive);

    return updatedMemberStati;
  }
}

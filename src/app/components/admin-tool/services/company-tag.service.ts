import { Tag } from '../../../core/model/tag';
import { TagDAO } from '../../../core/dao/tag.dao';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CompanyTagService {

  public tags: BehaviorSubject<Tag[]> = new BehaviorSubject([]);
  public archivedTags: BehaviorSubject<Tag[]> = new BehaviorSubject([]);

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public constructor(private tagDAO: TagDAO) {
    if (!this.readTagsFromSessionStorage()) {
      this.loadTags();
    }
  }

  public setTags(tags: Tag[]): void {
    if (tags == null) {
      tags = [];
    }
    this.tags.next(tags);
    sessionStorage.setItem('tags', JSON.stringify(this.tags.getValue()));
  }

  public setArchivedTags(tags: Tag[]): void {
    if (tags == null) {
      tags = [];
    }
    this.archivedTags.next(tags);
    sessionStorage.setItem('archivedTags', JSON.stringify(this.archivedTags.getValue()));
  }

  private async loadTags(): Promise<void> {
    if (this.tags.getValue().length === 0) {
      this.isLoading.next(true);
    }
    let tags = await this.tagDAO.fetchTags();
    this.setTags(tags.filter(t => !t.isArchive));
    this.setArchivedTags(tags.filter(t => t.isArchive));
    this.isLoading.next(false);
  }

  private readTagsFromSessionStorage(): boolean {
    let tags = JSON.parse(sessionStorage.getItem('tags'));
    let archivedTags = JSON.parse(sessionStorage.getItem('archivedTags'));
    if (tags != null && archivedTags != null) {
      this.tags.next(tags);
      this.archivedTags.next(archivedTags);
      return true;
    } else {
      return false;
    }
  }
}

import { Tag } from '../model/tag';
import { TagDAO } from '../dao/tag.dao';
import { Injectable } from '@angular/core';

@Injectable()
export class CompanyTagService {

  private tags: Tag[] = [];
  private archivedTags: Tag[] = [];

  public constructor(private tagDAO: TagDAO) {
    if (!this.readTagsFromSessionStorage()) {
      this.loadTags();
    }
  }

  public setTags(tags: Tag[]): void {
    if (tags == null) {
      tags = [];
    }
    this.tags = tags;
    sessionStorage.setItem('tags', JSON.stringify(this.tags));
  }

  public setArchivedTags(tags: Tag[]): void {
    if (tags == null) {
      tags = [];
    }
    this.archivedTags = tags;
    sessionStorage.setItem('archivedTags', JSON.stringify(this.archivedTags));
  }


  public getTags(): Tag[] {
    return this.tags.sort((a: Tag, b: Tag) => a.value.localeCompare(b.value));
  }

  public getArchivedTags(): Tag[] {
    return this.archivedTags.sort((a: Tag, b: Tag) => a.value.localeCompare(b.value));
  }

  private async loadTags(): Promise<void> {
    let tags = await this.tagDAO.fetchTags();
    this.setTags(tags.filter(t => !t.isArchive));
    this.setArchivedTags(tags.filter(t => t.isArchive));
  }

  private readTagsFromSessionStorage(): boolean {
    let tags = JSON.parse(sessionStorage.getItem('tags'));
    let archivedTags = JSON.parse(sessionStorage.getItem('archivedTags'));
    if (tags != null && archivedTags != null) {
      this.tags = tags;
      this.archivedTags = archivedTags;
      return true;
    } else {
      return false;
    }
  }
}

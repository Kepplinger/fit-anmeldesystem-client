import { Tag } from '../model/tag';
import { TagDAO } from '../dao/tag.dao';
import { Injectable } from '@angular/core';

@Injectable()
export class CompanyTagService {

  private tags: Tag[] = [];

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

  public getTags(): Tag[] {
    return this.tags;
  }

  private async loadTags(): Promise<void> {
    let tags = await this.tagDAO.fetchTags();
    this.setTags(tags);
  }

  private readTagsFromSessionStorage(): boolean {
    let tags = JSON.parse(sessionStorage.getItem('tags'));
    if (tags != null) {
      this.tags = tags;
      return true;
    } else {
      return false;
    }
  }

}

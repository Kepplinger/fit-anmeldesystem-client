import { Tag } from '../model/tag';
import { TagDAO } from '../dao/tag.dao';
import { Injectable } from '@angular/core';

@Injectable()
export class CompanyTagService {

  private tags: Tag[];

  public constructor(private tagDAO: TagDAO) {
    if (!this.readTagsFromSessionStorage()) {
      this.loadTags();
    }
  }

  public setTags(tags: Tag[]): void {
    this.tags = tags;
    localStorage.setItem('tags', JSON.stringify(this.tags));
  }

  public getTags(): Tag[] {
    return this.tags;
  }

  private async loadTags(): Promise<void> {
    this.tags = await this.tagDAO.fetchTags();
    console.log(this.tags);
    localStorage.setItem('tags', JSON.stringify(this.tags));
  }

  private readTagsFromSessionStorage(): boolean {
    let tags = JSON.parse(localStorage.getItem('tags'));
    console.log(tags);

    if (tags != null) {
      this.tags = tags;
      return true;
    } else {
      return false;
    }
  }

}

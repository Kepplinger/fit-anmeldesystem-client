import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../../core/model/tag';
import { TagDAO } from '../../../../core/dao/tag.dao';
import { ArrayUtils } from '../../../../core/utils/array-utils';
import { ToastrService } from 'ngx-toastr';
import { CompanyTagService } from '../../../../core/app-services/company-tag.service';

@Component({
  selector: 'fit-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  public tags: Tag[] = [];
  public archivedTags: Tag[] = [];
  public tagInput: string = '';

  public constructor(private tagDAO: TagDAO,
                     private toastr: ToastrService,
                     private tagService: CompanyTagService) {
  }

  public ngOnInit(): void {
    this.tags = this.tagService.getTags();
    this.archivedTags = this.tagService.getArchivedTags();
  }

  public addTag(): void {
    if (this.tags.find(t => t.value === this.tagInput) != null) {
      this.toastr.info('Dieser Tag ist bereits vorhanden!', 'Tag hinzufügen');
    } else if (this.archivedTags.find(t => t.value === this.tagInput) != null) {
      this.toastr.info('Dieser Tag ist schon archiviert! Reaktivieren sie diesen, oder nennen Sie den neuen Tag anders.', 'Tag hinzufügen');
    } else {
      this.tags.push(new Tag(this.tagInput));
      this.tagInput = '';
    }
  }

  public archiveTag(tag: Tag): void {
    tag.isArchive = true;
    this.archivedTags.push(tag);
    ArrayUtils.deleteElement(this.tags, tag);
  }

  public recoverTag(tag: Tag): void {
    tag.isArchive = false;
    this.tags.push(tag);
    ArrayUtils.deleteElement(this.archivedTags, tag);
  }

  public removeTag(array: Tag[], tag: Tag): void {
    ArrayUtils.deleteElement(array, tag);
    this.tagService.setTags(this.tags);
  }

  public async updateTags(): Promise<void> {
    let tags: Tag[] = await this.tagDAO.syncTags([...this.tags, ...this.archivedTags]);

    this.tags = tags.filter(t => !t.isArchive);
    this.archivedTags = tags.filter(t => t.isArchive);

    this.tagService.setTags(this.tags);
    this.tagService.setArchivedTags(this.archivedTags);
    this.toastr.success('Die Tags wurden erfolgreich gespeichert!', 'Update erfolgreich!');
  }
}

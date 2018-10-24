import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Tag } from '../../../../../core/model/tag';
import { TagDAO } from '../../../../../core/dao/tag.dao';
import { CompanyTagService } from '../../../services/company-tag.service';
import { ArrayUtils } from '../../../../../core/utils/array-utils';
import { BaseSettingsChangesComponent } from '../../../../../core/base-components/base-settings-changes.component';

@Component({
  selector: 'fit-settings-tags',
  templateUrl: './settings-tags.component.html',
  styleUrls: ['./settings-tags.component.scss']
})
export class SettingsTagsComponent extends BaseSettingsChangesComponent implements OnInit {

  public tags: Tag[] = [];
  public archivedTags: Tag[] = [];
  public tagInput: string = '';

  public isLoading: boolean = false;

  public constructor(private tagDAO: TagDAO,
                     private toastr: ToastrService,
                     private tagService: CompanyTagService) {
    super();
  }

  public ngOnInit(): void {
    this.tags = this.tagService.tags.getValue();
    this.archivedTags = this.tagService.archivedTags.getValue();

    this.isLoading = this.tagService.isLoading.getValue();
    this.addSub(this.tagService.isLoading.subscribe(l => this.isLoading = l));

    this.addSub(this.tagService.tags.subscribe(t => this.tags = t));
    this.addSub(this.tagService.archivedTags.subscribe(t => this.archivedTags = t));

    this.sortTags();
  }

  public addTag(): void {
    if (this.tags.find(t => t.value === this.tagInput) != null) {
      this.toastr.info('Dieser Tag ist bereits vorhanden!', 'Tag hinzufügen');
    } else if (this.archivedTags.find(t => t.value === this.tagInput) != null) {
      this.toastr.info('Dieser Tag ist schon archiviert! Reaktivieren sie diesen, oder nennen Sie den neuen Tag anders.', 'Tag hinzufügen');
    } else {
      this.tags.push(new Tag(this.tagInput));
      this.tagInput = '';
      this.sortTags();
      this.setUnsavedChanges(true);
    }
  }

  public archiveTag(tag: Tag): void {
    tag.isArchive = true;
    this.archivedTags.push(tag);
    ArrayUtils.deleteElement(this.tags, tag);
    this.sortTags();
    this.setUnsavedChanges(true);
  }

  public recoverTag(tag: Tag): void {
    tag.isArchive = false;
    this.tags.push(tag);
    ArrayUtils.deleteElement(this.archivedTags, tag);
    this.sortTags();
    this.setUnsavedChanges(true);
  }

  public removeTag(array: Tag[], tag: Tag): void {
    ArrayUtils.deleteElement(array, tag);
    this.tagService.setTags(this.tags);
    this.sortTags();
    this.setUnsavedChanges(true);
  }

  public async updateTags(): Promise<void> {
    let tags: Tag[] = await this.tagDAO.syncTags([...this.tags, ...this.archivedTags]);

    this.tags = tags.filter(t => !t.isArchive);
    this.archivedTags = tags.filter(t => t.isArchive);

    this.tagService.setTags(this.tags);
    this.tagService.setArchivedTags(this.archivedTags);
    this.toastr.success('Die Tags wurden erfolgreich gespeichert!', 'Update erfolgreich!');
    this.sortTags();
    this.setUnsavedChanges(false);
  }

  private sortTags(): void {
    this.tags = this.tags.sort((a: Tag, b: Tag) => a.value.localeCompare(b.value));
    this.archivedTags = this.archivedTags.sort((a: Tag, b: Tag) => a.value.localeCompare(b.value));
  }
}

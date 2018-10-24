import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Resource } from '../../../../../core/model/resource';
import { ResourceDAO } from '../../../../../core/dao/resource.dao';
import { ArrayUtils } from '../../../../../core/utils/array-utils';
import { BaseSettingsChangesComponent } from '../../../../../core/base-components/base-settings-changes.component';

@Component({
  selector: 'fit-settings-resources',
  templateUrl: './settings-resources.component.html',
  styleUrls: ['./settings-resources.component.scss']
})
export class SettingsResourcesComponent extends BaseSettingsChangesComponent implements OnInit {

  public resources: Resource[] = [];
  public archivedResources: Resource[] = [];

  public resourceInput: string = '';

  public isLoading: boolean = false;
  public isArchivedLoading: boolean = false;

  public constructor(private resourceDAO: ResourceDAO,
                     private toastr: ToastrService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.isArchivedLoading = true;
    this.resources = await this.resourceDAO.fetchResources();
    this.isLoading = false;
    this.archivedResources = await this.resourceDAO.fetchArchivedResources();
    this.isArchivedLoading = false;
  }

  public addResource(): void {
    if (this.resources.find(b => b.name === this.resourceInput) != null) {
      this.toastr.info('Diese Resource ist bereits vorhanden!', 'Resource hinzufügen');
    } else if (this.archivedResources.find(t => t.name === this.resourceInput) != null) {
      this.toastr.info('Diese Resource ist schon archiviert! Reaktivieren sie diese, oder nennen Sie die neue Resource anders.', 'Resource hinzufügen');
    } else {
      this.resources.push(new Resource(this.resourceInput));
      this.resourceInput = '';
      this.setUnsavedChanges(true);
    }
  }

  public archiveResource(resource: Resource): void {
    resource.isArchive = true;
    this.archivedResources.push(resource);
    ArrayUtils.deleteElement(this.resources, resource);
    this.setUnsavedChanges(true);
  }

  public recoverResource(resource: Resource): void {
    resource.isArchive = false;
    this.resources.push(resource);
    ArrayUtils.deleteElement(this.archivedResources, resource);
    this.setUnsavedChanges(true);
  }

  public removeResource(array: Resource[], resource: Resource): void {
    ArrayUtils.deleteElement(array, resource);
    this.setUnsavedChanges(true);
  }

  public async updateResources(): Promise<void> {
    let resources: Resource[] = await this.resourceDAO.updateResources([...this.resources, ...this.archivedResources]);

    this.resources = resources.filter(t => !t.isArchive);
    this.archivedResources = resources.filter(t => t.isArchive);
    this.toastr.success('Die Resourcen wurden erfolgreich gespeichert!', 'Update erfolgreich!');
    this.setUnsavedChanges(false);
  }
}

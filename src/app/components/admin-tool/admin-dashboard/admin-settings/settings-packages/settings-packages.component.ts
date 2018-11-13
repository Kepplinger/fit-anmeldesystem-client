import { Component, OnInit } from '@angular/core';

import { PackageDAO } from '../../../../../core/dao/package.dao';
import { FitPackage } from '../../../../../core/model/enums/fit-package';
import { Package } from '../../../../../core/model/package';
import { PackageHelper } from '../../../../../core/model/helper/package-helper';
import { BaseSettingsChangesComponent } from '../../../../../core/base-components/base-settings-changes.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fit-settings-packages',
  templateUrl: './settings-packages.component.html',
  styleUrls: ['./settings-packages.component.scss']
})
export class SettingsPackagesComponent extends BaseSettingsChangesComponent implements OnInit {

  public packages: Package[] = [];
  public editingPackage: Package;

  public isLoading: boolean = false;

  public constructor(private packageDAO: PackageDAO,
                     private toastr: ToastrService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.packages = (await this.packageDAO.fetchPackages()).sort(
      (a: Package, b: Package) => {
        return a.discriminator - b.discriminator;
      });
    this.isLoading = false;
  }

  public setEditingPackage(fitPackage: Package): void {
    if (this.editingPackage != null) {
      this.packages[this.packages.findIndex(p => p.id === this.editingPackage.id)] = PackageHelper.clone(this.editingPackage);
    }

    this.editingPackage = PackageHelper.clone(fitPackage);
  }

  public isPackageEditing(fitPackage: Package): boolean {
    return this.editingPackage != null && fitPackage.id === this.editingPackage.id;
  }

  public cancelEditing(fitPackage: Package): void {
    this.packages[this.packages.findIndex(p => p.id === fitPackage.id)] = PackageHelper.clone(this.editingPackage);
    this.setUnsavedChanges(false);
    this.editingPackage = null;
  }

  public async updatePackage(fitPackage: Package): Promise<void> {
    this.packages = await this.packageDAO.updatePackage(fitPackage);
    this.setUnsavedChanges(false);
    this.toastr.success('Das Paket wurde erfolgreich geändert.', 'Paket gespeichert');
    this.editingPackage = null;
  }

  public packageChanged(): void {
    this.setUnsavedChanges(true);
  }
}

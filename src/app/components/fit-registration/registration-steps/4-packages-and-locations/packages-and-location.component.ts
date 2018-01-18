import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FitPackage } from '../../../../core/model/enums/fit-package';
import { Package } from '../../../../core/model/package';
import { PackageDAO } from '../../../../core/dao/package.dao';

@Component({
  selector: 'fit-packages-and-location',
  templateUrl: './packages-and-location.component.html',
  styleUrls: ['./packages-and-location.component.scss']
})
export class PackagesAndLocationComponent implements OnInit {

  // necessary for template-usage
  Package = FitPackage;

  @Input()
  public isVisible: boolean = false;

  @Input()
  public stepFormGroup: FormGroup;

  public selectedLocation: Location;
  public selectedPackage: number = FitPackage.BasicPack;

  public basicPackage: Package = new Package();
  public sponsorPackage: Package = new Package();
  public lecturePackage: Package = new Package();

  public constructor(private packageDAO: PackageDAO) {
  }

  public async ngOnInit(): Promise<void> {
    let packages: Package[] = await this.packageDAO.getPackages();
    this.basicPackage = packages.find(p => p.discriminator === 1);
    this.sponsorPackage = packages.find(p => p.discriminator === 2);
    this.lecturePackage = packages.find(p => p.discriminator === 3);

    if (this.stepFormGroup.value.fitPackage != null) {
      this.selectedPackage = this.stepFormGroup.value.fitPackage;
    } else {
      this.stepFormGroup.controls['fitPackage'].setValue(this.getSelectedPackage(this.selectedPackage));
    }

    if (this.stepFormGroup.value.location != null) {
      this.selectedLocation = this.stepFormGroup.value.location;
    }
  }

  public setLocation(location: Location): void {
    this.selectedLocation = location;
    this.stepFormGroup.controls['location'].setValue(this.selectedLocation);
  }

  public togglePackage(packageNumber: number): void {
    if (packageNumber-- === this.selectedPackage) {
      this.selectedPackage--;
    } else if (packageNumber++ === this.selectedPackage) {
      this.selectedPackage++;
    } else {
      this.selectedPackage = packageNumber;
    }

    this.stepFormGroup.controls['fitPackage'].setValue(this.getSelectedPackage(this.selectedPackage));
  }

  public isPackageSelected(packageType: FitPackage): boolean {
    return packageType <= this.selectedPackage;
  }

  public getSelectedPackage(packageType: FitPackage): Package {
    switch (packageType) {
      case FitPackage.BasicPack:
        return this.basicPackage;
      case FitPackage.SponsorPack:
        return this.sponsorPackage;
      case FitPackage.LecturePack:
        return this.lecturePackage;
    }
  }
}

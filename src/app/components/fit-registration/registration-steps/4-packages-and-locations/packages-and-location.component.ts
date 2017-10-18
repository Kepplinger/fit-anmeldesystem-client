import { Component, Input } from '@angular/core';
import { FitPackage } from '../../../../core/model/enums/fit-package';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fit-packages-and-location',
  templateUrl: './packages-and-location.component.html',
  styleUrls: ['./packages-and-location.component.scss']
})
export class PackagesAndLocationComponent {

  // necessary for template-usage
  Package = FitPackage;

  @Input()
  public fitFormGroup: FormGroup;

  public selectedPackage: number = FitPackage.BasicPack;

  public constructor() {
  }

  public togglePackage(packageNumber: number): void {
    this.selectedPackage ^= packageNumber;

    if (this.isPackageSelected(FitPackage.LecturePack) && !this.isPackageSelected(FitPackage.SponsorPack)) {
      this.selectedPackage |= FitPackage.SponsorPack ;
    }
  }

  public isPackageSelected(packageNumber: number): boolean {
    return (this.selectedPackage & packageNumber) !== 0;
  }
}

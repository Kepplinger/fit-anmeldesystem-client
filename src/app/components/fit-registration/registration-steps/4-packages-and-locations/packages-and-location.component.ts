import { Component } from '@angular/core';

@Component({
  selector: 'fit-packages-and-location',
  templateUrl: './packages-and-location.component.html',
  styleUrls: ['./packages-and-location.component.scss']
})
export class PackagesAndLocationComponent {

  public selectedPackage: number = 1;

  public constructor() {
  }

  public togglePackage(packageNumber: number): void {
    console.log(this.selectedPackage);
    this.selectedPackage ^= packageNumber;
  }

  public isPackageSelected(packageNumber: number): boolean {
    return (this.selectedPackage & packageNumber) !== 0;
  }
}

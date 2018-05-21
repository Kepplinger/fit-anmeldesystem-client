import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {FitPackage} from '../../../../core/model/enums/fit-package';
import {Package} from '../../../../core/model/package';
import {PackageDAO} from '../../../../core/dao/package.dao';
import {PickedFile} from '../../../../libs/file-picker/picked-file';
import {FilePickerError} from '../../../../libs/file-picker/file-picker-error';
import {Branch} from '../../../../core/model/branch';
import {BranchDAO} from '../../../../core/dao/branch.dao';
import {FormArrayUtils} from '../../../../core/utils/form-array-utils';
import {ToastrService} from 'ngx-toastr';
import {AccountManagementService} from '../../../../core/app-services/account-managenment.service';
import {DataFile} from '../../../../core/model/data-file';

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

  @Input()
  public event: Event;

  public selectedLocation: Location;
  public selectedPackage: number = FitPackage.BasicPack;

  public branches: Branch[] = [];
  public branchFormArray: FormArray = null;

  public basicPackage: Package = new Package();
  public sponsorPackage: Package = new Package();
  public lecturePackage: Package = new Package();

  public pickedFile: PickedFile;

  public constructor(private packageDAO: PackageDAO,
                     private branchDAO: BranchDAO,
                     private toastr: ToastrService,
                     private accountManagementService: AccountManagementService) {
  }

  public async ngOnInit(): Promise<void> {
    this.branches = await this.branchDAO.fetchBranches();
    let packages: Package[] = await this.packageDAO.fetchPackages();

    this.basicPackage = packages.find(p => p.discriminator === 1);
    this.sponsorPackage = packages.find(p => p.discriminator === 2);
    this.lecturePackage = packages.find(p => p.discriminator === 3);

    this.branchFormArray = <FormArray>this.stepFormGroup.get('presentationBranches');

    this.accountManagementService.bookingFilled.subscribe(
      () => {
        this.selectedPackage = this.stepFormGroup.value.fitPackage.discriminator;
        this.branchFormArray = <FormArray>this.stepFormGroup.get('presentationBranches');
      }
    );

    if (this.stepFormGroup.value.fitPackage != null) {
      this.selectedPackage = this.stepFormGroup.value.fitPackage.discriminator;
    } else {
      this.stepFormGroup.controls['fitPackage'].setValue(this.getSelectedPackage());
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

    if (packageNumber === this.selectedPackage && packageNumber !== FitPackage.BasicPack) {
      this.selectedPackage--;
    } else {
      this.selectedPackage = packageNumber;
    }

    this.stepFormGroup.controls['fitPackage'].setValue(this.getSelectedPackage());
  }

  public isPackageSelected(packageType: FitPackage): boolean {
    return packageType <= this.selectedPackage;
  }

  public filePicked(file: PickedFile | FilePickerError): void {
    if (file instanceof PickedFile) {
      this.pickedFile = file;
      this.stepFormGroup.controls['presentationFile'].setValue(new DataFile(this.pickedFile.name, this.pickedFile.dataURL));
    } else if (file === FilePickerError.FileTooBig) {
      this.toastr.warning('Die Datei darf nicht größer wie 20MB sein!');
    } else if (file === FilePickerError.InvalidFileType) {
      this.toastr.warning('Das Datei-Format wird nicht unterstüzt!');
    } else if (file === FilePickerError.UndefinedInput) {
      this.toastr.warning('Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es erneut!');
    }
  }

  public getSelectedPackage(): Package {
    switch (this.selectedPackage) {
      case FitPackage.BasicPack:
        return this.basicPackage;
      case FitPackage.SponsorPack:
        return this.sponsorPackage;
      case FitPackage.LecturePack:
        return this.lecturePackage;
    }
  }

  public branchChanged(branch: Branch, event: any): void {
    if (event.target.checked) {
      this.branchFormArray.push(new FormControl(branch));
    } else {
      let index = FormArrayUtils.indexOf(this.branchFormArray, branch);

      if (index !== -1) {
        this.branchFormArray.removeAt(index);
      }
    }
  }

  public isBranchSelected(branch: Branch): boolean {
    return FormArrayUtils.indexOf(this.branchFormArray, branch) !== -1;
  }
}

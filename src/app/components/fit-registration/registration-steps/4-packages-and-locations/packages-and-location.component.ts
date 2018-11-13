import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';

import { FitPackage } from '../../../../core/model/enums/fit-package';
import { Package } from '../../../../core/model/package';
import { PackageDAO } from '../../../../core/dao/package.dao';
import { PickedFile } from '../../../../libs/file-picker/picked-file';
import { FilePickerError } from '../../../../libs/file-picker/file-picker-error';
import { Branch } from '../../../../core/model/branch';
import { BranchDAO } from '../../../../core/dao/branch.dao';
import { FormArrayUtils } from '../../../../core/utils/form-array-utils';
import { ToastrService } from 'ngx-toastr';
import { AccountManagementService } from '../../../../core/app-services/account-managenment.service';
import { DataFile } from '../../../../core/model/data-file';
import { Location } from '../../../../core/model/location';
import { ModalWindowService } from '../../../../core/app-services/modal-window.service';
import { ModalTemplateCreatorHelper } from '../../../../core/app-helper/modal-template-creator-helper';
import { BaseFormValidationComponent } from '../../../../core/base-components/base-form-validation.component';
import { EventService } from '../../../../core/app-services/event.service';

@Component({
  selector: 'fit-packages-and-location',
  templateUrl: './packages-and-location.component.html',
  styleUrls: ['./packages-and-location.component.scss']
})
export class PackagesAndLocationComponent extends BaseFormValidationComponent implements OnInit {

  // necessary for template-usage
  Package = FitPackage;

  @Input()
  public isVisible: boolean = false;

  @Input()
  public formGroup: FormGroup;

  @Input()
  public event: Event;

  @Output()
  public onInput: EventEmitter<void> = new EventEmitter<void>();

  public selectedLocation: Location;
  public selectedPackage: number = FitPackage.BasicPack;

  public branches: Branch[] = [];
  public branchFormArray: FormArray = null;

  public basicPackage: Package = new Package();
  public sponsorPackage: Package = new Package();
  public lecturePackage: Package = new Package();

  public presentationFile: DataFile;

  public presentationsLocked = false;

  public constructor(private packageDAO: PackageDAO,
                     private branchDAO: BranchDAO,
                     private toastr: ToastrService,
                     private eventService: EventService,
                     private modalWindowService: ModalWindowService,
                     private accountManagementService: AccountManagementService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.presentationsLocked = this.eventService.currentEvent.getValue().presentationsLocked;
    console.log(this.presentationsLocked);

    this.branches = await this.branchDAO.fetchBranches();
    let packages: Package[] = await this.packageDAO.fetchPackages();

    this.basicPackage = packages.find(p => p.discriminator === 1);
    this.sponsorPackage = packages.find(p => p.discriminator === 2);
    this.lecturePackage = packages.find(p => p.discriminator === 3);

    this.branchFormArray = <FormArray>this.formGroup.get('presentationBranches');
    this.presentationFile = this.formGroup.value.presentationFile;

    if (this.presentationFile == null || this.presentationFile.name == null || this.presentationFile.name === '') {
      this.presentationFile = new DataFile('Datei auswählen ...', null);
    }

    this.addSub(this.accountManagementService.bookingFilled.subscribe(
      () => {
        this.selectedPackage = this.formGroup.value.fitPackage.discriminator;
        this.branchFormArray = <FormArray>this.formGroup.get('presentationBranches');

        if (this.formGroup.value.presentationFile != null) {
          this.presentationFile = this.formGroup.value.presentationFile;
        }
      }
    ));

    if (this.formGroup.value.fitPackage != null) {
      this.selectedPackage = this.formGroup.value.fitPackage.discriminator;
    } else {
      this.formGroup.controls['fitPackage'].setValue(this.getSelectedPackage());
    }

    if (this.formGroup.value.location != null) {
      this.selectedLocation = this.formGroup.value.location;
    }

    this.setPresentationTitleValidator();
  }

  public setLocation(location: Location): void {
    this.selectedLocation = location;
    this.formGroup.controls['location'].setValue(this.selectedLocation);
  }

  public togglePackage(packageNumber: number): void {

    if (this.presentationsLocked && this.selectedPackage === FitPackage.LecturePack) {
      this.modalWindowService.alert(
        `<h5 class="text-bold">Vorsicht!</h5>`,
        'Ein bestätigter Vortrag kann nicht mehr geändert werden.',
        ModalTemplateCreatorHelper.getBasicModalOptions('Ok', '')
      );
      return;
    }

    if (!this.presentationsLocked || packageNumber !== FitPackage.LecturePack) {
      if (packageNumber === this.selectedPackage && packageNumber !== FitPackage.BasicPack) {
        this.selectedPackage--;
      } else {
        this.selectedPackage = packageNumber;
      }

      if (this.selectedLocation != null && this.selectedLocation.category === 'A' && this.selectedPackage === FitPackage.BasicPack) {
        this.selectedPackage = FitPackage.SponsorPack;

        this.modalWindowService.alert(
          'Paket kann nicht geändert werden!',
          'Mit einem Standplatz der Kategorie A ist es nicht möglich auf das ' + this.basicPackage.name +
          ' zu wechseln! Bitte ändern Sie zuerst Ihren Standplatz bevor Sie das Paket ändern.',
          ModalTemplateCreatorHelper.getBasicModalOptions('Ok', 'Abbrechen')
        );
      }

      this.formGroup.controls['fitPackage'].setValue(this.getSelectedPackage());
      this.setPresentationTitleValidator();
    }
  }

  public isPackageSelected(packageType: FitPackage): boolean {
    return packageType <= this.selectedPackage;
  }

  public filePicked(file: PickedFile | FilePickerError): void {
    if (file instanceof PickedFile) {
      this.presentationFile.name = file.name;
      this.presentationFile.dataUrl = file.dataURL;
      this.formGroup.controls['presentationFile'].setValue(this.presentationFile);
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
    FormArrayUtils.elementChanged(branch, this.branchFormArray, event);
  }

  public isBranchSelected(branch: Branch): boolean {
    return FormArrayUtils.indexOfWithId(this.branchFormArray, branch) !== -1;
  }

  private setPresentationTitleValidator(): void {
    setTimeout(() => {
      if (this.selectedPackage === FitPackage.LecturePack) {
        this.formGroup.controls['presentationTitle'].setValidators(Validators.required);
        this.formGroup.controls['presentationDescription'].setValidators(Validators.required);
      } else {
        this.formGroup.controls['presentationTitle'].clearValidators();
        this.formGroup.controls['presentationDescription'].clearValidators();
      }
      this.formGroup.controls['presentationTitle'].updateValueAndValidity();
      this.formGroup.controls['presentationDescription'].updateValueAndValidity();
    }, 0);
  }
}

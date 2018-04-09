import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Booking } from '../../../../../core/model/booking';
import { BookingTransferService } from '../../../../../core/app-services/booking-transfer.service';
import { FormHelper } from '../../../../../core/app-helper/form-helper';
import { DisplayedValueMapper } from '../../../../../core/app-helper/helper-model/mapper/displayed-value-mapper';
import { AppConfig } from '../../../../../core/app-config/app-config.service';
import { Branch } from '../../../../../core/model/branch';
import { BranchDAO } from '../../../../../core/dao/branch.dao';
import { FormArrayUtils } from '../../../../../core/utils/form-array-utils';
import { PickedFile } from '../../../../../libs/file-picker/picked-file';
import { FilePickerError } from '../../../../../libs/file-picker/file-picker-error';
import { Representative } from '../../../../../core/model/representative';
import { ArrayUtils } from '../../../../../core/utils/array-utils';
import { FitPackage } from '../../../../../core/model/enums/fit-package';
import { Package } from '../../../../../core/model/package';
import { PackageDAO } from '../../../../../core/dao/package.dao';
import { Event } from '../../../../../core/model/event';
import { DisplayedValue } from '../../../../../core/app-helper/helper-model/displayed-value';
import { ToastrService } from 'ngx-toastr';

declare let $;

@Component({
  selector: 'fit-booking-detail',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  @ViewChild('establishmentIntCount')
  public establishmentIntCount: ElementRef;

  @ViewChild('establishmentAutCount')
  public establishmentAutCount: ElementRef;

  public genders: DisplayedValue[];

  public event: Event = null;

  public areRepresentativesTouched: boolean = false;

  public options: any;

  public booking: Booking;
  public bookingFormGroup: FormGroup;
  public companyDescription: string = '';

  public branches: Branch[] = [];
  public branchFormArray: FormArray = new FormArray([]);

  public representatives: Representative[] = [];
  public touchedRepresentatives: any[] = [];

  public logo: PickedFile;

  Package = FitPackage;

  public selectedLocation: Location;
  public selectedPackage: number = FitPackage.BasicPack;

  public packages: Package[] = [];
  public basicPackage: Package = new Package();
  public sponsorPackage: Package = new Package();
  public lecturePackage: Package = new Package();

  public constructor(private bookingTransferService: BookingTransferService,
                     private activatedRoute: ActivatedRoute,
                     private appConfig: AppConfig,
                     private router: Router,
                     private fb: FormBuilder,
                     private toastr: ToastrService,
                     private branchDAO: BranchDAO,
                     private packageDAO: PackageDAO) {
    this.bookingFormGroup = this.fb.group({
      companyName: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      addressAdditions: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      homepage: ['', Validators.required],
      logoUrl: ['', Validators.required],
      branch: ['', Validators.required],
      description: ['', Validators.required],
      establishmentsAut: this.fb.array([]),
      establishmentsCountAut: [0, Validators.required],
      establishmentsInt: this.fb.array([]),
      establishmentsCountInt: [0],
      desiredBranches: this.fb.array([]),
      providesSummerJob: [false],
      providesThesis: [false],
      representatives: this.fb.array([]),
      additionalInfo: ['', Validators.required],
      resources: this.fb.array([]),
      fitPackage: [null, Validators.required],
      location: [],
      presentationTitle: [''],
      presentationDescription: [''],
      presentationFile: [''],
      gender: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactEmail: ['', Validators.required],
      contactPhoneNumber: ['', Validators.required],
      remarks: [''],
      termsAccepted: [false, Validators.requiredTrue]
    });

    this.options = {
      charCounterCount: true,
      charCounterMax: 1000,
      quickInsert: false,
      heightMin: 250,
      heightMax: 490,
      enter: $.FroalaEditor.ENTER_BR,
      tooltips: true,
      fontSize: '30',
      placeholderText: '',
      quickInsertTags: '',
      inlineMode: true,
      toolbarButtons: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|',
        'formatUL', 'formatOL', 'clearFormatting', '|', 'superscript', 'outdent', 'indent']
    };

    this.genders = appConfig.genders;
  }

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params.id != null) {
          this.booking = this.bookingTransferService.getBooking(Number(params.id));
          if (this.booking == null) {
            this.router.navigate(['/admin-tool', 'dash'])
          } else {
            this.fillFormWithBooking();
          }
        }
      }
    );
  }

  private async fillFormWithBooking(): Promise<void> {
    this.bookingFormGroup.patchValue({
      companyName: this.booking.company.name,
      street: this.booking.company.address.street,
      streetNumber: this.booking.company.address.streetNumber,
      zipCode: this.booking.company.address.zipCode,
      city: this.booking.company.address.city,
      addressAdditions: this.booking.company.address.addition,
      phoneNumber: this.booking.phoneNumber,
      email: this.booking.email,
      homepage: this.booking.homepage,
      logoUrl: this.booking.logo,
      branch: this.booking.branch,
      description: this.booking.companyDescription,
      establishmentsCountAut: this.booking.establishmentsCountAut,
      establishmentsCountInt: this.booking.establishmentsCountInt,
      providesSummerJob: this.booking.providesSummerJob,
      providesThesis: this.booking.providesThesis,
      additionalInfo: this.booking.additionalInfo,
      fitPackage: this.booking.fitPackage,
      location: this.booking.location,
      remarks: this.booking.remarks,
      gender: DisplayedValueMapper.mapToDisplayValue(this.booking.company.contact.gender, this.appConfig.genders).value,
      firstName: this.booking.company.contact.firstName,
      lastName: this.booking.company.contact.lastName,
      contactEmail: this.booking.company.contact.email,
      contactPhoneNumber: this.booking.company.contact.phoneNumber,
    });

    (<FormGroup> this.bookingFormGroup).setControl('establishmentsAut', this.fb.array(this.booking.establishmentsAut));
    (<FormGroup> this.bookingFormGroup).setControl('establishmentsInt', this.fb.array(this.booking.establishmentsInt));
    (<FormGroup> this.bookingFormGroup).setControl('desiredBranches', this.fb.array(this.booking.branches));
    (<FormGroup> this.bookingFormGroup).setControl('representatives', this.fb.array(this.booking.representatives));
    (<FormGroup> this.bookingFormGroup).setControl('resources', this.fb.array(this.booking.resources));

    if (this.booking.presentation != null) {
      this.bookingFormGroup.patchValue({
        packagesAndLocation: {
          presentationTitle: this.booking.presentation.title,
          presentationDescription: this.booking.presentation.description,
          presentationFile: this.booking.presentation.fileUrl
        }
      });
    }

    this.companyDescription = this.bookingFormGroup.value.description;
    this.event = this.booking.event;

    if (this.bookingFormGroup.value.fitPackage != null) {
      this.selectedPackage = this.bookingFormGroup.value.fitPackage;
    } else {
      this.bookingFormGroup.controls['fitPackage'].setValue(this.getSelectedPackage(this.selectedPackage));
    }

    if (this.bookingFormGroup.value.location != null) {
      this.selectedLocation = this.bookingFormGroup.value.location;
    }

    this.branches = await this.branchDAO.fetchBranches();
    this.branchFormArray = <FormArray>this.bookingFormGroup.get('desiredBranches');

    this.packages = (await this.packageDAO.fetchPackages())
      .sort(
        (a: Package, b: Package) => {
          return a.discriminator - b.discriminator;
        }
      );
  }

  public setLocation(location: Location): void {
    this.selectedLocation = location;
    this.bookingFormGroup.controls['location'].setValue(this.selectedLocation);
  }

  public togglePackage(packageNumber: number): void {
    if (packageNumber-- === this.selectedPackage) {
      this.selectedPackage--;
    } else if (packageNumber++ === this.selectedPackage) {
      this.selectedPackage++;
    } else {
      this.selectedPackage = packageNumber;
    }

    this.bookingFormGroup.controls['fitPackage'].setValue(this.getSelectedPackage(this.selectedPackage));
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

  public onRepresentativeAdd(): void {
    this.addRepresentative(new Representative('', '', '../../../../../assets/contact.png'));
  }

  public addRepresentative(representative: Representative): void {
    let representativeArray: FormArray = <FormArray>this.bookingFormGroup.get('representatives');
    console.log(representativeArray);
    this.representatives.push(representative);

    this.touchedRepresentatives.push({
      representative: representative,
      name: false,
      email: false
    });

    representativeArray.push(new FormControl(representative));
  }

  public deleteRepresentative(representative: Representative): void {
    let representativeArray: FormArray = <FormArray>this.bookingFormGroup.get('representatives');
    ArrayUtils.deleteElement(this.representatives, representative);
    ArrayUtils.deleteElement(
      this.touchedRepresentatives,
      this.touchedRepresentatives.find(r => r.representative === representative)
    );
    representativeArray.removeAt(FormArrayUtils.indexOf(representativeArray, representative));
  }

  public onRepresentativeTouch(representative: Representative, attribute: string): void {
    let foundRepresentative = this.touchedRepresentatives.find(r => r.representative === representative);

    if (attribute === 'name') {
      foundRepresentative.name = true;
    } else if (attribute === 'email') {
      foundRepresentative.email = true;
    }
  }

  public isRepresentativeEmpty(representative: Representative, attribute: string): boolean {

    let input = '';

    if (attribute === 'name') {
      input = representative.name;
    } else if (attribute === 'email') {
      input = representative.email;
    }

    return (input == null || input === '') && this.isTouched(representative, attribute);
  }

  public isTouched(representative: Representative, attribute: string): boolean {
    if (!this.areRepresentativesTouched) {
      if (attribute === 'name') {
        return this.touchedRepresentatives.find(r => r.representative === representative).name;
      } else if (attribute === 'email') {
        return this.touchedRepresentatives.find(r => r.representative === representative).email;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  public updateEstablishments(controlName: string, names: string[]): void {
    this.bookingFormGroup.setControl(controlName, new FormArray(names.map(n => new FormControl(n))));
    this.verifyAutEstablishmentsCount();
    this.verifyIntEstablishmentsCount();
  }

  public verifyAutEstablishmentsCount(): void {
    let count: number = Math.max(
      this.bookingFormGroup.value.establishmentsAut.length,
      this.establishmentAutCount.nativeElement.value
    );

    this.establishmentAutCount.nativeElement.value = count;
    this.bookingFormGroup.controls['establishmentsCountAut'].setValue(count);
  }

  public verifyIntEstablishmentsCount(): void {
    let count: number = Math.max(
      this.bookingFormGroup.value.establishmentsInt.length,
      this.establishmentIntCount.nativeElement.value
    );

    this.establishmentIntCount.nativeElement.value = count;
    this.bookingFormGroup.controls['establishmentsCountInt'].setValue(count);
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

  public updateDescription(): void {
    this.bookingFormGroup.controls['description'].setValue(this.companyDescription);
  }

  public filePicked(file: PickedFile | FilePickerError): void {
    if (file instanceof PickedFile) {
      this.logo = file;
      this.bookingFormGroup.value.logoUrl = this.logo.dataURL;
    } else {
      this.imagePickErrorHandler(file);
    }
  }

  public representativeImagePicked(file: PickedFile | FilePickerError, representative: Representative): void {
    if (file instanceof PickedFile) {
      representative.imageUrl = file.dataURL;
    } else {
      this.imagePickErrorHandler(file);
    }
  }

  public isEmpty(formName: string): boolean {
    return FormHelper.isEmpty(formName, this.bookingFormGroup) && this.isInvalid(formName);
  }

  public isNoMail(formName: string): boolean {
    return FormHelper.isNoEmail(formName, this.bookingFormGroup) && this.isInvalid(formName);
  }

  public isInvalid(formName: string): boolean {
    return FormHelper.hasError(formName, this.bookingFormGroup) != null &&
      FormHelper.isTouched(formName, this.bookingFormGroup);
  }

  private imagePickErrorHandler(error: FilePickerError): void {
    if (error === FilePickerError.FileTooBig) {
      this.toastr.warning('Das Bild darf nicht größer wie 2MB sein!')
    } else if (error === FilePickerError.InvalidFileType) {
      this.toastr.warning('Die angegeben Datei ist kein Bild!')
    } else if (error === FilePickerError.UndefinedInput) {
      this.toastr.warning('Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es erneut!')
    }
  }
}

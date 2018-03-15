import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from '../../../../../core/model/booking';
import { BookingTransferService } from '../../../../../core/app-services/booking-transfer.service';
import { FormValidationHelper } from '../../../../../core/app-helper/form-validation-helper';
import { DisplayedValueMapper } from '../../../../../core/app-helper/helper-model/mapper/displayed-value-mapper';
import { AppConfig } from '../../../../../core/app-config/app-config.service';

@Component({
  selector: 'fit-booking-detail',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  public booking: Booking;
  public bookingFormGroup: FormGroup;

  public constructor(private bookingTransferService: BookingTransferService,
                     private activatedRoute: ActivatedRoute,
                     private appConfig: AppConfig,
                     private router: Router,
                     private fb: FormBuilder) {
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
  }

  public ngOnInit(): void {
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
      });
  }

  public isEmpty(formName: string): boolean {
    return FormValidationHelper.isEmpty(formName, this.bookingFormGroup) && this.isInvalid(formName);
  }

  public isNoMail(formName: string): boolean {
    return FormValidationHelper.isNoEmail(formName, this.bookingFormGroup) && this.isInvalid(formName);
  }

  public isInvalid(formName: string): boolean {
    return FormValidationHelper.hasError(formName, this.bookingFormGroup) != null &&
      FormValidationHelper.isTouched(formName, this.bookingFormGroup);
  }

  private fillFormWithBooking() {
    console.log(this.booking.company.folderInfo.establishmentsAut);

    this.bookingFormGroup.patchValue({
      companyName: this.booking.company.name,
      street: this.booking.company.address.street,
      streetNumber: this.booking.company.address.streetNumber,
      zipCode: this.booking.company.address.zipCode,
      city: this.booking.company.address.city,
      addressAdditions: this.booking.company.address.addition,
      phoneNumber: this.booking.company.folderInfo.phoneNumber,
      email: this.booking.company.folderInfo.email,
      homepage: this.booking.company.folderInfo.homepage,
      logoUrl: this.booking.company.folderInfo.logo,
      branch: this.booking.company.folderInfo.branch,
      description: this.booking.companyDescription,
      // establishmentsAut: this.booking.company.folderInfo.establishmentsAut,
      establishmentsCountAut: this.booking.company.folderInfo.establishmentsCountAut,
      // establishmentsInt: this.booking.company.folderInfo.establishmentsInt,
      establishmentsCountInt: this.booking.company.folderInfo.establishmentsCountInt,
      desiredBranches: this.booking.branches,
      providesSummerJob: this.booking.providesSummerJob,
      providesThesis: this.booking.providesThesis,
      // representatives: this.booking.representatives,
      additionalInfo: this.booking.additionalInfo,
      // resources: this.booking.resources,
      fitPackage: this.booking.fitPackage,
      location: this.booking.location,
      remarks: this.booking.remarks,
      gender: DisplayedValueMapper.mapToDisplayValue(this.booking.company.contact.gender, this.appConfig.genders).display,
      firstName: this.booking.company.contact.firstName,
      lastName: this.booking.company.contact.lastName,
      contactEmail: this.booking.company.contact.email,
      contactPhoneNumber: this.booking.company.contact.phoneNumber,
    });

    // if (this.booking.presentation != null) {
    //   this.fitFormGroup.patchValue({
    //     packagesAndLocation: {
    //       presentationTitle: this.booking.presentation.title,
    //       presentationDescription: this.booking.presentation.description,
    //       // presentationFile: this.booking.presentation.fileUrl
    //     }
    //   });
    // }
  }
}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Booking } from '../../../../../core/model/booking';
import { BookingTransferService } from '../../../../../core/app-services/booking-transfer.service';
import { FormValidationHelper } from '../../../../../core/app-helper/form-validation-helper';
import { DisplayedValueMapper } from '../../../../../core/app-helper/helper-model/mapper/displayed-value-mapper';
import { AppConfig } from '../../../../../core/app-config/app-config.service';
import {Branch} from '../../../../../core/model/branch';
import {BranchDAO} from '../../../../../core/dao/branch.dao';
import {FormArrayUtils} from '../../../../../core/utils/form-array-utils';
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

  public options:any;

  public booking: Booking;
  public bookingFormGroup: FormGroup;
  public bookingAutArray:string[] = ['Linz','Wien'];

  public branches: Branch[] = [];
  public branchFormArray: FormArray = new FormArray([]);


  public constructor(private bookingTransferService: BookingTransferService,
                     private activatedRoute: ActivatedRoute,
                     private appConfig: AppConfig,
                     private router: Router,
                     private fb: FormBuilder,
                     private branchDAO: BranchDAO) {
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
      // toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      // toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      // toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    };
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
      });
    this.branches = await this.branchDAO.fetchBranches();
    this.branchFormArray = <FormArray>this.bookingFormGroup.get('desiredBranches');

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
  public createArrayFromString(tmp:string[]):string[]{
    console.log(tmp);
    return new Array();
  }



  private fillFormWithBooking() {
    console.log(this.booking.company.folderInfo.establishmentsAut);
    this.createArrayFromString(this.booking.company.folderInfo.establishmentsAut);
    console.log(this.booking.branches);
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
      //establishmentsAut: this.fb.array([]),
      establishmentsCountAut: this.booking.company.folderInfo.establishmentsCountAut,
      // establishmentsInt: this.booking.company.folderInfo.establishmentsInt,
      establishmentsCountInt: this.booking.company.folderInfo.establishmentsCountInt,
     // desiredBranches: new FormArray([]),
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

    this.fillArrays(this.bookingAutArray);
    this.tickBranches();
    this.pushFroala();
    //this.tickBranches();
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



  fillArrays(establishmentsArrayAut:string[]){
    const control = <FormArray>this.bookingFormGroup.controls['establishmentsAut'];
    for (let entry of establishmentsArrayAut) {
      control.push(this.fb.group({"display": entry,
        "value": entry}));
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

  public tickBranches() {

    const control = <FormArray>this.bookingFormGroup.controls['desiredBranches'];
    for (let entry of this.booking.branches) {
      console.log(entry);

      this.branchFormArray.push(new FormControl(entry));

      control.push(this.fb.group({"name": entry.name,
        "id": entry.id,
        "timestamp":entry.timestamp}));
    }
  }

  public pushFroala(): void{
    console.log(this.booking.companyDescription);
    $('#description').froalaEditor('html.set', '<p>My custom paragraph.</p>');

    $("#description").editable("insertHTML", "123456", true);
    $("#description").editable("sync");
  }
}

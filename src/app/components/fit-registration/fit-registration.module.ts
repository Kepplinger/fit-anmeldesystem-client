import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FitRegistrationRoutingModule } from './fit-registration-routing.module';
import { FitRegistrationComponent } from './fit-registration.component';
import { CodeRequestComponent } from './code-request/code-request.component';
import { GeneralDataComponent } from './registration-steps/1-general-data/general-data.component';
import { DetailedDataComponent } from './registration-steps/2-detailed-data/detailed-data.component';
import { FitAppearanceComponent } from './registration-steps/3-fit-appearance/fit-appearance.component';
import { ContactAndRemarksComponent } from './registration-steps/5-contact-and-remarks/contact-and-remarks.component';
import { SubmissionSuccessComponent } from './submission-success/submission-success.component';
import { PackagesAndLocationComponent } from './registration-steps/4-packages-and-locations/packages-and-location.component';
import { FilePickerModule } from '../../libs/file-picker/file-picker.module';
import { SharedModule } from '../shared-elements/shared.module';
import { LocationPickerModalComponent } from './registration-steps/4-packages-and-locations/location-picker-modal/location-picker-modal.component';
import { UpdateSuccessComponent } from './update-success/update-success.component';

@NgModule({
  imports: [
    CommonModule,
    FitRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FilePickerModule,
    SharedModule
  ],
  declarations: [
    FitRegistrationComponent,
    CodeRequestComponent,
    GeneralDataComponent,
    DetailedDataComponent,
    FitAppearanceComponent,
    PackagesAndLocationComponent,
    ContactAndRemarksComponent,
    SubmissionSuccessComponent,
    UpdateSuccessComponent,
    LocationPickerModalComponent
  ]
})
export class FitRegistrationModule {
}

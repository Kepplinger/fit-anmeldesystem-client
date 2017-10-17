import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FitRegistrationRoutingModule } from './fit-registration-routing.module';
import { FitRegistrationComponent } from './fit-registration.component';
import { CodeRequestComponent } from './code-request/code-request.component';
import { GeneralDataComponent } from './registration-steps/1-general-data/general-data.component';
import { DetailedDataComponent } from './registration-steps/2-detailed-data/detailed-data.component';
import { FitAppearanceComponent } from './registration-steps/3-fit-appearance/fit-appearance.component';
import { ContactAndRemarksComponent } from './registration-steps/5-contact-and-remarks/contact-and-remarks.component';
import { SubmissionSuccessComponent } from './submission-success/submission-success.component';
import { PackagesAndLocationComponent } from './registration-steps/4-packages-and-locations/packages-and-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FitRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FitRegistrationComponent,
    CodeRequestComponent,
    GeneralDataComponent,
    DetailedDataComponent,
    FitAppearanceComponent,
    PackagesAndLocationComponent,
    ContactAndRemarksComponent,
    SubmissionSuccessComponent
  ]
})
export class FitRegistrationModule {
}

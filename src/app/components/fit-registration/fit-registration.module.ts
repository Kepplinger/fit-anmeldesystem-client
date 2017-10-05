import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FitRegistrationRoutingModule } from './fit-registration-routing.module';
import { FitRegistrationComponent } from './fit-registration.component';
import { CodeRequestComponent } from './code-request/code-request.component';
import { GeneralDataComponent } from './registration-steps/1-general-data/general-data.component';
import { DetailedDataComponent } from './registration-steps/2-detailed-data/detailed-data.component';
import { FitAppearanceComponent } from './registration-steps/3-fit-appearance/fit-appearance.component';
import { ContactAndRemarksComponent } from './registration-steps/4-contact-and-remarks/contact-and-remarks.component';

@NgModule({
  imports: [
    CommonModule,
    FitRegistrationRoutingModule
  ],
  declarations: [
    FitRegistrationComponent,
    CodeRequestComponent,
    GeneralDataComponent,
    DetailedDataComponent,
    FitAppearanceComponent,
    ContactAndRemarksComponent
  ]
})
export class FitRegistrationModule {
}

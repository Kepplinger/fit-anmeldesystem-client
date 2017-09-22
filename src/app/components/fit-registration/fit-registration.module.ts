import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FitRegistrationRoutingModule } from './fit-registration-routing.module';
import { FitRegistrationComponent } from './fit-registration.component';
import { FitVerificationComponent } from './fit-verification/fit-verification.component';

@NgModule({
  imports: [
    CommonModule,
    FitRegistrationRoutingModule
  ],
  declarations: [
    FitRegistrationComponent,
    FitVerificationComponent
  ]
})
export class FitRegistrationModule {
}

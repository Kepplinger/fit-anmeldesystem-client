import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FitRegistrationRoutingModule } from './fit-registration-routing.module';
import { FitRegistrationComponent } from './fit-registration.component';
import { VerificationComponent } from './verification/verification.component';

@NgModule({
  imports: [
    CommonModule,
    FitRegistrationRoutingModule
  ],
  declarations: [FitRegistrationComponent, VerificationComponent]
})
export class FitRegistrationModule { }

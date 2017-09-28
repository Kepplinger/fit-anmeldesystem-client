import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FitRegistrationRoutingModule } from './fit-registration-routing.module';
import { FitRegistrationComponent } from './fit-registration.component';
import { CodeRequestComponent } from './code-request/code-request.component';

@NgModule({
  imports: [
    CommonModule,
    FitRegistrationRoutingModule
  ],
  declarations: [
    FitRegistrationComponent,
    CodeRequestComponent
  ]
})
export class FitRegistrationModule {
}

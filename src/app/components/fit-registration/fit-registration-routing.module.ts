import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FitRegistrationComponent } from './fit-registration.component';
import { FitVerificationComponent } from './fit-verification/fit-verification.component';

const routes: Routes = [
  {
    path: 'anmelden',
    component: FitRegistrationComponent
  },
  {
    path: 'verification',
    component: FitVerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitRegistrationRoutingModule {
}
